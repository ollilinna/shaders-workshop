#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
varying vec3 nor;
uniform float time;

void main()
{
    float s = 0.1;
    vec2 center = vec2(0.5);
    vec3 color = vec3(step(mod(distance(vUv, center) + time/18.0, s), s/2.0));

    gl_FragColor = vec4( color, 1.0 );
}
