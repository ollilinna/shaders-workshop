#define PI 3.1415926535897932384626433832795

uniform sampler2D dataTexture;
uniform float time;
uniform float delta;
uniform vec2 res;

void main()	{
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 data = texture2D( dataTexture, uv );
  
  gl_FragColor = vec4( data );
}