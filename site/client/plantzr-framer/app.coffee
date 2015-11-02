# Scale to fit device
# artboardWidth = 640
# Framer.Device.contentScale = (Screen.width / artboardWidth)
#Framer.Device.contentScale = 1

# Properties
plantzr = Framer.Importer.load "imported/plantzr-framer"
# search form collapsed
collapsed = true

plantzr.Search_screen.props = 
	backgroundColor: 'white'

# Resizable button                  
plantzr.searchButton = new Layer({
	x: 906,
	y: 90,
	width: 149,
	height: 149,
	backgroundColor: '#68AD1C',
	borderRadius: 80
}); 

# Define states
plantzr.Search_bar.states.add
          open: {height: 610} 
plantzr.search_icon.states.add
          down: {y: 480}
plantzr.Search_Form.states.add
 		hidden: {opacity: 0} 

plantzr.Cards.states.add
          docked: {y: 400} 

plantzr.searchButton.states.add
          down:
           {y: 445}
# Hide the form          
plantzr.Search_Form.states.switchInstant('hidden')

# Set superlayer for dragging
plantzr.searchButton.superLayer = plantzr.Search_bar
plantzr.Search_Form.superLayer = plantzr.Search_bar
plantzr.search_icon.superLayer = plantzr.Search_bar

#Dragging constraints
plantzr.Search_bar.draggable.enabled = false
plantzr.Search_bar.draggable.speedX = 0
plantzr.Search_bar.draggable.speedY = 0.525
plantzr.Search_bar.draggable.constraints = 
	height: 500
plantzr.Search_bar.draggable.overdrag = false


plantzr.Search_bar.on Events.Drag, ->
	plantzr.Search_Form.states.switch('hidden', time: 0)	plantzr.Search_bar.states.switch("default", time: 0.2)
	plantzr.Cards.states.switch('default', time: 0.2) 
	plantzr.search_icon.states.switch('default', time: 0.2)
	plantzr.searchButton.states.switch('default', time: 0.2)

# Layer positioning
plantzr.search_icon.y = 125
plantzr.search_icon.index = 3
plantzr.Search_Form.index = 1
plantzr.searchButton.index = 2

# Event handling
plantzr.searchButton.on Events.Click, ->
	plantzr.Search_bar.states.switch("open", delay: 0.1, time: 0.2)
	plantzr.Cards.states.switch('docked',delay: 0.1,  time: 0.2) 
	plantzr.search_icon.states.switch('down', delay: 0.1, time: 0.2)
	plantzr.searchButton.states.switch('down', delay: 0.1, time: 0.2)
  
 
counter = 0 
plantzr.searchButton.on Events.AnimationEnd,  (animation, layer) ->
	 if counter == 0
#     print 'run'
    plantzr.searchButton.animate
     properties:
       width: 1010
       x: 45
     curve:'linear'
     time: 0.1
    counter++
    plantzr.Search_Form.states.switch('default')     

# 	plantzr.searchButton.animate
# 		properties:
#  			width: 1010
#        		x: 45
#      curve:'linear'
#      time: 0.1
#     counter++
#     plantzr.Search_Form.states.switch('default')     
#   	plantzr.Search_bar.draggable.enabled = true  
  	
  	

   

   

   

      
          

