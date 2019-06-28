#define PI 3.1415926535897932384626433832795

uniform float time;
uniform vec2 resolution;
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0); 
}
