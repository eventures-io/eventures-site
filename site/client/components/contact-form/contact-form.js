'use strict';


angular.module('evtrs-site').directive('contactForm', function (MailService) {

    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'components/contact-form/contact-form.html',
        controller: function ($scope, $element, MailService) {

            var element = $element[0];

            function randomID() {
                var id = Math.random().toString(36).substr(2, 9);
                if (document.getElementById(id)) {
                    return randomID();
                }
                return id;
            }

            var contactForm = element.querySelector('.contact-form');
            var current = 0;
            var steps = [].slice.call(element.querySelectorAll('ol.steps > li'));
            var stepsCount = steps.length;
            //show first step
            steps[0].classList.add('current');
            var nextstepNum;
            var ctrlNext = element.querySelector('button.next');
            ctrlNext.setAttribute('aria-label', 'Next');

            var progress = element.querySelector('div.progress');
            progress.setAttribute('role', 'progressbar');
            progress.setAttribute('aria-readonly', 'true');
            progress.setAttribute('aria-valuemin', '0');
            progress.setAttribute('aria-valuemax', '100');
            progress.setAttribute('aria-valuenow', '0');

            // step number status
            var stepStatus = element.querySelector('span.number');
            stepStatus.id = stepStatus.id || randomID();

            for (var i = steps.length - 1; i >= 0; i--) {
                var formElement = steps[i].querySelector('input, textarea, select');
                formElement.setAttribute('aria-describedby', stepStatus.id);
                formElement.addEventListener('input', function(event) {
                    var label = steps[current].querySelector('label');
                    label.style.opacity = 1;
                });
            }
            ;
            var currentNum = stepStatus.querySelector('span.number-current');
            currentNum.innerHTML = Number(current + 1);
            var totalstepNum = stepStatus.querySelector('span.number-total');
            totalstepNum.innerHTML = stepsCount;

            var error = element.querySelector('span.error-message');

            var supportsHTML5Forms = typeof document.createElement("input").checkValidity === 'function';

            var firstElInput = steps[current].querySelector('input, textarea, select');
            firstElInput.focus();
            var controls = element.querySelector('.controls');

            var inputEventHandler = function (event) {
                var label = steps[current].querySelector('label');
                firstElInput.removeEventListener('input', inputEventHandler);
                controls.style.opacity = 1;
                ctrlNext.classList.add('show');
            };

            firstElInput.addEventListener('input', inputEventHandler);

            ctrlNext.addEventListener('click', function (ev) {
                ev.preventDefault();
                nextstep();
            });

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
                var input = steps[current].querySelector('input, textarea, select');
                input.addEventListener('input', function(event) {
                    var label = steps[current].querySelector('label');
                    label.style.opacity = 1;
                });
                if (supportsHTML5Forms) {
                    // clear any previous error messages
                    input.setCustomValidity('');
                    if (!input.checkValidity()) {
                        input.setCustomValidity('This doesn\'t look like an email address');
                        showError(input.validationMessage);
                        return false;
                    }
                }

                if (current === stepsCount - 1) {
                    isCompleted = true;
                }

                clearError();
                var currentstep = steps[current];
                ++current;
                updateProgress();

                if (!isCompleted) {
                    updatestepNumber();
                    contactForm.classList.add('show-next');
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
                        if (nextNbr) {
                            stepStatus.removeChild(nextNbr);
                        }
                        nextstep.querySelector('input, textarea, select').focus();
                    }
                };
                contactForm.addEventListener('transitionend', onEndTransitionFn);

            };

            var updateProgress = function () {
                var currentProgress = current * ( 100 / stepsCount );
                progress.style.width = currentProgress + '%';
                // update the progressbar's aria-valuenow attribute
                progress.setAttribute('aria-valuenow', currentProgress);
            };

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
                var formData = {
                    name: contactForm.elements['name'].value,
                    email: contactForm.elements['email'].value,
                    message: contactForm.elements['message'].value
                };
                contactForm.querySelector('.form-inner').classList.add('hide');
                //show spinner

                var spinner = contactForm.querySelector('.spinner');
                spinner.classList.add('show');

                var messageEl = contactForm.querySelector('.final-message');
                MailService.sendContactForm(formData).then(function (response) {
                    spinner.classList.remove('show');
                    messageEl.innerHTML = 'Message sent, thanks! I will get back to you.';
                    messageEl.classList.add('show');
                }, function (error) {
                    spinner.classList.remove('show');
                    messageEl.innerHTML = 'Oops, something went wrong.<br/> Please contact me in some other way.';
                    messageEl.classList.add('error');
                    messageEl.classList.add('show');
                });
            };

            var validate = function () {
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

            var clearError = function () {
                error.classList.remove('show');
            };
        }
    };
});