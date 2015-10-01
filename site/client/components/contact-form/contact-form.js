'use strict';


angular.module('evtrs-site').directive('contactForm', function () {

    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'components/contact-form/contact-form.html',
        controller: function ($scope, $element) {

            var element = $element[0];

            function randomID() {
                var id = Math.random().toString(36).substr(2, 9);
                if (document.getElementById(id)) {
                    return randomID();
                }
                return id;
            }

            var contactForm = element.querySelector('.contact-form');
            // current step
            var current = 0;
            // steps
            var steps = [].slice.call(element.querySelectorAll('ol.steps > li'));
            // total steps
            var stepsCount = steps.length;
            // show first step
            steps[0].classList.add('current');

            var nextstepNum;
            // next step control
            var ctrlNext = element.querySelector('button.next');
            ctrlNext.setAttribute('aria-label', 'Next');

            // progress bar
            var progress = element.querySelector('div.progress');
            // set progressbar attributes
            progress.setAttribute('role', 'progressbar');
            progress.setAttribute('aria-readonly', 'true');
            progress.setAttribute('aria-valuemin', '0');
            progress.setAttribute('aria-valuemax', '100');
            progress.setAttribute('aria-valuenow', '0');

            // step number status
            var stepStatus = element.querySelector('span.number');
            // give the steps status an id
            stepStatus.id = stepStatus.id || randomID();
            // associate "x / y" with the input via aria-describedby
            for (var i = steps.length - 1; i >= 0; i--) {
                var formElement = steps[i].querySelector('input, textarea, select');
                formElement.setAttribute('aria-describedby', stepStatus.id);
            };
            // current step placeholder
            var currentNum = stepStatus.querySelector('span.number-current');
            currentNum.innerHTML = Number(current + 1);
            // total steps placeholder
            var totalstepNum = stepStatus.querySelector('span.number-total');
            totalstepNum.innerHTML = stepsCount;

            // error message
            var error = element.querySelector('span.error-message');

            // checks for HTML5 Form Validation support
            // a cleaner solution might be to add form validation to the custom Modernizr script
            var supportsHTML5Forms = typeof document.createElement("input").checkValidity === 'function';

            // first input
            var firstElInput = steps[current].querySelector('input, textarea, select');
            firstElInput.focus();
            var controls = element.querySelector('.controls');

            var inputEventHandler = function (event) {
                firstElInput.removeEventListener('input', inputEventHandler);
                controls.style.opacity = 1;
                ctrlNext.classList.add('show');
            };

            firstElInput.addEventListener('input', inputEventHandler);

            // show next step
            ctrlNext.addEventListener('click', function (ev) {
                ev.preventDefault();
                nextstep();
            });

            // pressing enter will jump to next step
            element.addEventListener('keydown', function (event) {
                var keyCode = event.keyCode || event.which;
                // enter
                if (keyCode === 13) {
                    event.preventDefault();
                    nextstep();
                }

            });


            var nextstep = function () {
                if (!validate()) {
                    return false;
                }

                var isCompleted = false;
                // checks HTML5 validation
                if (supportsHTML5Forms) {
                    var input = steps[current ].querySelector('input, textarea, select');
                    // clear any previous error messages
                    input.setCustomValidity('');

                    // checks input against the validation constraint
                    if (!input.checkValidity()) {
                        // Optionally, set a custom HTML5 valiation message
                        // comment or remove this line to use the browser default message
                        input.setCustomValidity('This doesn\'t look like an email address');
                        // display the HTML5 error message
                        showError(input.validationMessage);
                        // prevent the step from changing
                        return false;
                    }
                }

                // check if form is filled
                if (current === stepsCount - 1) {
                    isCompleted = true;
                }

                // clear any previous error messages
                clearError();

                // current step
                var currentstep = steps[current];

                // increment current step iterator
                ++current;

                // update progress bar
                updateProgress();

                if (!isCompleted) {
                    // change the current step number/status
                    updatestepNumber();

                    // add class "show-next" to form element (start animations)
                    contactForm.classList.add('show-next');

                    // remove class "current" from current step and add it to the next one
                    // current step
                    var nextstep = steps[current ];
                    currentstep.classList.remove('current');
                    nextstep.classList.add('current');
                }


                var onEndTransitionFn = function (ev) {
                    contactForm.removeEventListener('transitionend', onEndTransitionFn);
                    if (isCompleted) {
                        submit();
                    }
                    else {
                        contactForm.classList.remove('show-next');
                        currentNum.innerHTML = nextstepNum.innerHTML;
                        var nextNbr = stepStatus.querySelector('.number-next');
                        if(nextNbr){
                        stepStatus.removeChild(nextNbr);
                        }
                        nextstep.querySelector('input, textarea, select').focus();
                    }
                };

                contactForm.addEventListener('transitionend', onEndTransitionFn);

            };


            // updates the progress bar by setting its width
            var updateProgress = function () {
                var currentProgress = current * ( 100 / stepsCount );
                progress.style.width = currentProgress + '%';
                // update the progressbar's aria-valuenow attribute
                progress.setAttribute('aria-valuenow', currentProgress);
            };

            // changes the current step number
            var updatestepNumber = function () {
                // first, create next step number placeholder
                nextstepNum = document.createElement('span');
                nextstepNum.className = 'number-next';
                nextstepNum.innerHTML = Number(current + 1);
                // insert it in the DOM
                stepStatus.appendChild(nextstepNum);
            };

            // submits the form
            var submit = function () {

            };

            var validate = function () {
                // current step´s input
                var input = steps[ current ].querySelector('input, textarea, select').value;
                if (input === '') {
                    showError('EMPTYSTR');
                    return false;
                }

                return true;
            };

            var showError = function (err) {
                var message = '';
                switch (err) {
                    case 'EMPTYSTR' :
                        message = 'Please fill the field before continuing';
                        break;
                    case 'INVALIDEMAIL' :
                        message = 'Please provide a valid email address';
                        break;
                    // ...
                    default :
                        message = err;
                }

                error.innerHTML = message;
                error.classList.add('show');
            };

            // clears/hides the current error message
            var clearError = function () {
                error.classList.remove('show');
            };


        }
    };
});