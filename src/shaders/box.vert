#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
varying vec3 nor;

void main()	{
	vUv = uv;
	nor = normal * 0.5 + 0.5;
	gl_Position = vec4(position, 1.0);
	//gl_Position = vec4(projectionMatrix * modelViewMatrix * vec4( position, 1.0));
}
