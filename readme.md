<h1>Patternizer.js</h1>
Patternizer.js is a canvas script to generate stripe patterns. To see what it's capable of, I strongly recommend going to <a href="http://patternizer.com">patternizer.com</a>
<h2>How to Use</h2>
patternizer.js adds a patternizer() method to canvas elements. It can receive one parameter, which is an options object. In that you can specify a stripes array, and a background color.
<pre>
var bgCanvas = document.getElementById('bgCanvas');

bgCanvas.patternizer({
    stripes : [ 
        {
            color: '#ffb4d5',
            rotation: 45,
            opacity: 80,
            mode: 'normal',
            width: 30,
            gap: 10,
            offset: 0
        },
        {
            color: '#3a83d6',
            rotation: 200,
            opacity: 50,
            mode: 'plaid',
            width: 10,
            gap: 10,
            offset: 0
        }
    ],
    bg : '#ffffff'
});
</pre>
<h2>License</h2>
Patternizer.js is dual-licensed under MIT/GPL. Use whichever you'd like.