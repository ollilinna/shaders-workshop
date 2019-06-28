#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform sampler2D dataTexture;
uniform float time;
uniform vec2 resolution;

void main()
{
    vec4 color = texture2D( dataTexture, vUv );
    gl_FragColor = vec4(color);
}
