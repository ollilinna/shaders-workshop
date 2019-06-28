#pragma glslify: grain = require(glsl-film-grain)
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform vec2 res;
uniform sampler2D tex;
uniform float time;

// https://github.com/Jam3/glsl-fast-gaussian-blur/blob/master/9.glsl
vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}

void main()
{
    vec2 uv = vUv;

    float s = 0.1;
    vec2 center = vec2(0.5);

    vec3 color = vec3(step(mod(distance(vUv, center) + time/18.0, s), s/2.0));
    vec3 img = texture2D(tex, uv).rgb;    
    //vec3 blurImg = blur9(tex, uv, res, vec2(cos(time), sin(time)) * sin(time) * 2.0).rgb;
    vec3 noise = vec3(grain(uv, res, time));
    
    gl_FragColor = vec4( img, 1.0 );
}
