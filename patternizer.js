/*
 * patternizer.js
 * To see what this is capable of, see the UI at patternizer.com
 * 
 * Developed by Matthew Lein
 * matthewlein.com
 * 
 * Released under the MIT license.
 * Please leave this license and author info intact.
 * 
 * Copyright 2011
 */

var patternizer = {
	
	supportsCanvas : function() {
		var elem = document.createElement( 'canvas' );
		return !!(elem.getContext && elem.getContext('2d'));
	},
	
	// nabbed from http://www.hunlock.com/blogs/Mastering_Javascript_Arrays#quickIDX34
	isArray : function(testObject) {   
	    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
	},
	
	DEGREES_RADIANS : function(degrees) {
		return (degrees * Math.PI / 180);
	},
	
	HEX_RGBA : function(color, alpha) {
		
		var r = parseInt(color.substring(1,3),16);
		var g = parseInt(color.substring(3,5),16);
		var b = parseInt(color.substring(5,7),16);
		var a = alpha;
		
		return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
		
	},

	stripe : function(canvas, options) {
		
		var stripes = options.stripes;
		var bgColor = options.bg;
		
		var ctx = canvas.getContext('2d');
		var cWidth = canvas.width;
		var cHeight = canvas.height;
		var diagLength = Math.sqrt( (cWidth * cWidth) + (cHeight * cHeight) );
			
		//draw background color
		ctx.fillStyle = bgColor;
		ctx.fillRect( 0, 0, cWidth, cHeight);
			
		//draw stripes
		for (var j = stripes.length - 1; j >= 0; j--){
	
			var current = stripes[j],
				
				opacity = current.opacity / 100 || 0.5,
				color = patternizer.HEX_RGBA( current.color, opacity ),
				mode = current.mode || 'normal',
				rotate = current.rotation || 0,
				stripeWidth = current.width,
				offset = current.offset || 0,
				gap = current.gap || stripeWidth,
				tile = stripeWidth + gap,
				repeats = ( (diagLength * 2) + offset ) / tile;

			// rotate	
			ctx.rotate( patternizer.DEGREES_RADIANS(rotate) );
			
			if ( mode === 'normal' || mode === 'plaid' ) {
			
				for ( var i=0; i < repeats; i++ ) {
		
					if ( patternizer.isArray(color) ) {
						// I'm hoping its an array of colors
					
						var startStripe = (tile * i) + offset,
							endStripe = (tile * i) + offset + stripeWidth,
					
							lingrad = ctx.createLinearGradient( startStripe, 0, endStripe, 0),
						
							//get the number of color stops needed
							stopAmount = 1 / (color.length - 1 );
					
						// put in the color stops evenly across the rectangle	
						for (var k=0; k < color.length; k++) {
							lingrad.addColorStop( stopAmount * k , color[k] );
						}
			
						ctx.fillStyle = lingrad;
		
					} else {
						// its a plain old string color
						ctx.fillStyle = color;
					}
					
					ctx.fillRect( -diagLength + (tile * i) - offset, -diagLength, stripeWidth, diagLength * 2);
					// old
					//ctx.fillRect( (tile * i) + offset, 0, stripeWidth, cHeight);

				}
				
			}
			
			
			if ( mode === 'plaid' ) {
				
				for ( var h=0; h < repeats; h++ ) {
		
					if ( patternizer.isArray(color) ) {
						// I'm hoping its an array of colors
					
						startStripe = (tile * h) + offset;
						endStripe = (tile * h) + offset + stripeWidth;
					
						lingrad = ctx.createLinearGradient( 0, startStripe, 0, endStripe );
						
						//get the number of color stops needed
						stopAmount = 1 / (color.length - 1 );
					
					
						// put in the color stops evenly across the rectangle	
						for (var k=0; k < color.length; k++) {
							lingrad.addColorStop( stopAmount * k , color[k] );
						}
			
						ctx.fillStyle = lingrad;
		
					} else {
						// its a plain old string color
						ctx.fillStyle = color;
					}
					
					ctx.fillRect( -diagLength, -diagLength + (tile * h) + offset, diagLength * 2 , stripeWidth);
					// old
					//ctx.fillRect( 0, (tile * h) + offset, cWidth , stripeWidth);
					
				}
				
			}
			
			//rotate back
			ctx.rotate( -patternizer.DEGREES_RADIANS(rotate) );
			
	
		}
	
	}


};

if ( patternizer.supportsCanvas ) {
	// prototype the patternizer method onto canvas
	HTMLCanvasElement.prototype.patternizer = function ( options ) { 
		// pass in the canvas and options
		patternizer.stripe( this, options );
	};
}