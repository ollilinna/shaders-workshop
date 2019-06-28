#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main()	{
	vUv = uv;
	gl_Position = vec4(position.xy, 0.0, 1.0);
}
