(()=>{var N=Object.defineProperty;var X=(t,e,i)=>e in t?N(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var o=(t,e,i)=>X(t,typeof e!="symbol"?e+"":e,i);var M=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;var A=1920*1080*4,U=class{constructor(e,i,r,a,s=0,l=0,n=2,h=A,u=[]){o(this,"parentElement");o(this,"canvasElement");o(this,"gl");o(this,"program",null);o(this,"uniformLocations",{});o(this,"fragmentShader");o(this,"rafId",null);o(this,"lastRenderTime",0);o(this,"currentFrame",0);o(this,"speed",0);o(this,"currentSpeed",0);o(this,"providedUniforms");o(this,"mipmaps",[]);o(this,"hasBeenDisposed",!1);o(this,"resolutionChanged",!0);o(this,"textures",new Map);o(this,"minPixelRatio");o(this,"maxPixelCount");o(this,"isSafari",k());o(this,"uniformCache",{});o(this,"textureUnitMap",new Map);o(this,"ownerDocument");o(this,"initProgram",()=>{let e=j(this.gl,M,this.fragmentShader);e&&(this.program=e)});o(this,"setupPositionAttribute",()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});o(this,"setupUniforms",()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){let a=`${i}AspectRatio`;e[a]=this.gl.getUniformLocation(this.program,a)}}),this.uniformLocations=e});o(this,"renderScale",1);o(this,"parentWidth",0);o(this,"parentHeight",0);o(this,"parentDevicePixelWidth",0);o(this,"parentDevicePixelHeight",0);o(this,"devicePixelsSupported",!1);o(this,"intersectionObserver",null);o(this,"isInViewport",!0);o(this,"resizeObserver",null);o(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var i;if(e!=null&&e.borderBoxSize[0]){let r=(i=e.devicePixelContentBoxSize)==null?void 0:i[0];r!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=r.inlineSize,this.parentDevicePixelHeight=r.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});o(this,"setupIntersectionObserver",()=>{let e=this.ownerDocument.defaultView;e!=null&&e.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([i])=>{var r;this.isInViewport=(r=i==null?void 0:i.isIntersecting)!=null?r:!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))});o(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});o(this,"handleResize",()=>{var p;let e=0,i=0,r=Math.max(1,window.devicePixelRatio),a=(p=visualViewport==null?void 0:visualViewport.scale)!=null?p:1;if(this.devicePixelsSupported){let c=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*c*a,i=this.parentDevicePixelHeight*c*a}else{let c=Math.max(r,this.minPixelRatio)*a;if(this.isSafari){let f=$(this.ownerDocument);c*=Math.max(1,f)}e=Math.round(this.parentWidth)*c,i=Math.round(this.parentHeight)*c}let s=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),l=Math.min(1,s),n=Math.round(e*l),h=Math.round(i*l),u=n/Math.round(this.parentWidth);(this.canvasElement.width!==n||this.canvasElement.height!==h||this.renderScale!==u)&&(this.renderScale=u,this.canvasElement.width=n,this.canvasElement.height=h,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});o(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});o(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});o(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let a=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+a);let s=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let l=this.gl.getError();if(l!==this.gl.NO_ERROR||s===null){console.error("Paper Shaders: WebGL error when uploading texture:",l);return}this.textures.set(e,s);let n=this.uniformLocations[e];if(n){this.gl.uniform1i(n,a);let h=`${e}AspectRatio`,u=this.uniformLocations[h];if(u){let p=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(u,p)}}});o(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,a)=>this.areUniformValuesEqual(r,i[a])):!1);o(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let a=r;if(r instanceof HTMLImageElement&&(a=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],a))return;this.uniformCache[i]=a;let s=this.uniformLocations[i];if(!s){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let l=null,n=null;if(r[0]!==void 0&&Array.isArray(r[0])){let h=r[0].length;if(r.every(u=>u.length===h))l=r.flat(),n=h;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else l=r,n=l.length;switch(n){case 2:this.gl.uniform2fv(s,l);break;case 3:this.gl.uniform3fv(s,l);break;case 4:this.gl.uniform4fv(s,l);break;case 9:this.gl.uniformMatrix3fv(s,!1,l);break;case 16:this.gl.uniformMatrix4fv(s,!1,l);break;default:console.warn(`Unsupported uniform array length: ${n}`)}}else typeof r=="number"?this.gl.uniform1f(s,r):typeof r=="boolean"?this.gl.uniform1i(s,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});o(this,"getCurrentFrame",()=>this.currentFrame);o(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});o(this,"setSpeed",(e=1)=>{this.speed=e,this.updateCurrentSpeed()});o(this,"updateCurrentSpeed",()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)});o(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});o(this,"setMaxPixelCount",(e=A)=>{this.maxPixelCount=e,this.handleResize()});o(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});o(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});o(this,"handleDocumentVisibilityChange",()=>{this.updateCurrentSpeed()});o(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if((e==null?void 0:e.nodeType)===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let f=this.ownerDocument.createElement("style");f.innerHTML=Y,f.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(f)}let p=this.ownerDocument.createElement("canvas");this.canvasElement=p,this.parentElement.prepend(p),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=u,this.currentFrame=l,this.minPixelRatio=n,this.maxPixelCount=h;let c=p.getContext("webgl2",a);if(!c)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=c,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(s),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function O(t,e,i){let r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function j(t,e,i){let r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),a=r?r.precision:null;a&&a<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let s=O(t,t.VERTEX_SHADER,e),l=O(t,t.FRAGMENT_SHADER,i);if(!s||!l)return null;let n=t.createProgram();return n?(t.attachShader(n,s),t.attachShader(n,l),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS)?(t.detachShader(n,s),t.detachShader(n,l),t.deleteShader(s),t.deleteShader(l),n):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(n)),t.deleteProgram(n),t.deleteShader(s),t.deleteShader(l),null)):null}var Y=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function k(){let t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function $(t){var n,h;let e=(n=visualViewport==null?void 0:visualViewport.scale)!=null?n:1,i=(h=visualViewport==null?void 0:visualViewport.width)!=null?h:window.innerWidth,r=window.innerWidth-t.documentElement.clientWidth,a=e*i+r,s=outerWidth/a,l=Math.round(100*s);return l%5===0?l/100:l===33?1/3:l===67?2/3:l===133?4/3:s}var V={fit:"none",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},y={none:0,contain:1,cover:2};var D=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`;var I=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,W=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var C=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;var E=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;

out vec4 fragColor;

${C}
${D}
${I}
${W}

float getSimplexNoise(vec2 uv, float t) {
  float noise = .5 * snoise(uv - vec2(0., .3 * t));
  noise += .5 * snoise(2. * uv + vec2(0., .32 * t));

  return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {
  float t = .5 * u_time;

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec2 shapeUV = normalizedUV;

  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 boxSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  
  if (u_shape > 3.5) {
    vec2 objectBoxSize = vec2(0.);
    // fit = none
    objectBoxSize.x = min(boxSize.x, boxSize.y);
    if (u_fit == 1.) { // fit = contain
      objectBoxSize.x = min(u_resolution.x, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      objectBoxSize.x = max(u_resolution.x, u_resolution.y);
    }
    objectBoxSize.y = objectBoxSize.x;
    vec2 objectWorldScale = u_resolution.xy / objectBoxSize;

    shapeUV *= objectWorldScale;
    shapeUV += boxOrigin * (objectWorldScale - 1.);
    shapeUV += vec2(-u_offsetX, u_offsetY);
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
  } else {
    vec2 patternBoxSize = vec2(0.);
    // fit = none
    patternBoxSize.x = patternBoxRatio * min(boxSize.x / patternBoxRatio, boxSize.y);
    float patternWorldNoFitBoxWidth = patternBoxSize.x;
    if (u_fit == 1.) { // fit = contain
      patternBoxSize.x = patternBoxRatio * min(u_resolution.x / patternBoxRatio, u_resolution.y);
    } else if (u_fit == 2.) { // fit = cover
      patternBoxSize.x = patternBoxRatio * max(u_resolution.x / patternBoxRatio, u_resolution.y);
    }
    patternBoxSize.y = patternBoxSize.x / patternBoxRatio;
    vec2 patternWorldScale = u_resolution.xy / patternBoxSize;

    shapeUV += vec2(-u_offsetX, u_offsetY) / patternWorldScale;
    shapeUV += boxOrigin;
    shapeUV -= boxOrigin / patternWorldScale;
    shapeUV *= u_resolution.xy;
    shapeUV /= u_pixelRatio;
    if (u_fit > 0.) {
      shapeUV *= (patternWorldNoFitBoxWidth / patternBoxSize.x);
    }
    shapeUV /= u_scale;
    shapeUV = graphicRotation * shapeUV;
    shapeUV += boxOrigin / patternWorldScale;
    shapeUV -= boxOrigin;
    shapeUV += .5;
  }

  float shape = 0.;
  if (u_shape < 1.5) {
    // Simplex noise
    shapeUV *= .001;

    shape = 0.5 + 0.5 * getSimplexNoise(shapeUV, t);
    shape = smoothstep(0.3, 0.9, shape);

  } else if (u_shape < 2.5) {
    // Warp
    shapeUV *= .003;

    for (float i = 1.0; i < 6.0; i++) {
      shapeUV.x += 0.6 / i * cos(i * 2.5 * shapeUV.y + t);
      shapeUV.y += 0.6 / i * cos(i * 1.5 * shapeUV.x + t);
    }

    shape = .15 / max(0.001, abs(sin(t - shapeUV.y - shapeUV.x)));
    shape = smoothstep(0.02, 1., shape);

  } else if (u_shape < 3.5) {
    // Dots
    shapeUV *= .05;

    float stripeIdx = floor(2. * shapeUV.x / TWO_PI);
    float rand = hash11(stripeIdx * 10.);
    rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
    shape = sin(shapeUV.x) * cos(shapeUV.y - 5. * rand * t);
    shape = pow(abs(shape), 6.);

  } else if (u_shape < 4.5) {
    // Sine wave
    shapeUV *= 4.;

    float wave = cos(.5 * shapeUV.x - 2. * t) * sin(1.5 * shapeUV.x + t) * (.75 + .25 * cos(3. * t));
    shape = 1. - smoothstep(-1., 1., shapeUV.y + wave);

  } else if (u_shape < 5.5) {
    // Ripple

    float dist = length(shapeUV);
    float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Swirl

    float l = length(shapeUV);
    float angle = 6. * atan(shapeUV.y, shapeUV.x) + 4. * t;
    float twist = 1.2;
    float offset = 1. / pow(max(l, 1e-6), twist) + angle / TWO_PI;
    float mid = smoothstep(0., 1., pow(l, twist));
    shape = mix(0., fract(offset), mid);

  } else {
    // Sphere
    shapeUV *= 2.;

    float d = 1. - pow(length(shapeUV), 2.);
    vec3 pos = vec3(shapeUV, sqrt(max(0., d)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }


  int type = int(floor(u_type));
  float dithering = 0.0;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), shape);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  dithering -= .5;
  float res = step(.5, shape + dithering);

  vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
  float fgOpacity = u_colorFront.a;
  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  float bgOpacity = u_colorBack.a;

  vec3 color = fgColor * res;
  float opacity = fgOpacity * res;

  color += bgColor * (1. - opacity);
  opacity += bgOpacity * (1. - opacity);

  fragColor = vec4(color, opacity);
}
`,F={simplex:1,warp:2,dots:3,wave:4,ripple:5,swirl:6,sphere:7},P={random:1,"2x2":2,"4x4":3,"8x8":4};function w(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:b;if(typeof t!="string")return b;let e,i,r,a=1;if(t.startsWith("#"))[e,i,r,a]=q(t);else if(t.startsWith("rgb")){let s=K(t);if(s===null)return b;[e,i,r,a]=s}else if(t.startsWith("hsl")){let s=Z(t);if(s===null)return b;[e,i,r,a]=J(s)}else return console.error("Unsupported color format",t),b;return[z(e,0,1),z(i,0,1),z(r,0,1),z(a,0,1)]}function q(t){if(t=t.replace(/^#/,""),(t.length===3||t.length===4)&&(t=t.split("").map(s=>s+s).join("")),t.length===6&&(t=t+"ff"),!/^[0-9a-f]{8}$/i.test(t))return console.warn("Invalid hex color"),b;let e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,a=parseInt(t.slice(6,8),16)/255;return[e,i,r,a]}function K(t){var i,r,a;let e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0")/255,parseInt((r=e[2])!=null?r:"0")/255,parseInt((a=e[3])!=null?a:"0")/255,e[4]===void 0?1:parseFloat(e[4])]:null}function Z(t){var i,r,a;let e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt((i=e[1])!=null?i:"0"),parseInt((r=e[2])!=null?r:"0"),parseInt((a=e[3])!=null?a:"0"),e[4]===void 0?1:parseFloat(e[4])]:null}function J(t){let[e,i,r,a]=t,s=e/360,l=i/100,n=r/100,h,u,p;if(i===0)h=u=p=n;else{let c=(d,S,m)=>(m<0&&(m+=1),m>1&&(m-=1),m<.16666666666666666?d+(S-d)*6*m:m<.5?S:m<.6666666666666666?d+(S-d)*(.6666666666666666-m)*6:d),f=n<.5?n*(1+l):n+l-n*l,v=2*n-f;h=c(v,f,s+1/3),u=c(v,f,s),p=c(v,f,s-1/3)}return[h,u,p,a]}var z=(t,e,i)=>Math.min(Math.max(t,e),i),b=[.5,.5,.5,1];var L=window.matchMedia("(prefers-reduced-motion: reduce)").matches,g=V,Q=getComputedStyle(document.documentElement).getPropertyValue("--bg-brand").trim()||"#3DE83D";document.querySelectorAll("[data-dither-banner], [data-dither]").forEach(t=>{let e=t.dataset,i=(a,s)=>a===void 0?s:parseFloat(a),r=e.messages?JSON.parse(e.messages):null;try{let a=new U(t,E,{u_colorBack:w("#00000000"),u_colorFront:w(Q),u_shape:F[e.shape||"wave"],u_type:P[e.type||"4x4"],u_pxSize:i(e.size,3),u_fit:y[g.fit],u_scale:i(e.scale,1.25),u_rotation:g.rotation,u_offsetX:g.offsetX,u_offsetY:g.offsetY,u_originX:g.originX,u_originY:g.originY,u_worldWidth:g.worldWidth,u_worldHeight:g.worldHeight},r?{alpha:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!0}:void 0,L?0:i(e.speed,.94),i(e.frame,1097832933e-3));r&&!L&&ee(t,a.canvasElement,r)}catch{t.hidden=!0}});function ee(t,e,i){let r=t.parentElement.querySelector(".raft-message-text");if(!r||i.length<2)return;let a=48,s=12,l=document.createElement("canvas");l.width=a,l.height=s;let n=l.getContext("2d",{willReadFrequently:!0}),h=parseFloat(t.dataset.darkBelow||"0.06"),u=parseFloat(t.dataset.litAbove||"0.25"),p=3e3,c=8e3,f=14e3,v=0,d=!1,S=performance.now(),m=!0;new IntersectionObserver(x=>{m=x[0].isIntersecting}).observe(t);let H=()=>{let x=e.width,_=e.height;if(!x||!_)return 1;n.clearRect(0,0,a,s),n.drawImage(e,x*.15,_*.35,x*.7,_*.3,0,0,a,s);let R=n.getImageData(0,0,a,s).data,T=0;for(let B=3;B<R.length;B+=4)R[B]>128&&T++;return T/(a*s)},G=()=>{v=(v+1)%i.length,r.textContent=i[v],S=performance.now(),d=!1};setInterval(()=>{if(!m||document.hidden)return;let x=H(),_=performance.now()-S;!d&&x>u&&(d=!0);let R=Math.max(0,Math.min(1,(_-c)/(f-c)));(d&&x<h&&_>p||R>0&&x<h+R*(.5-h)||_>f)&&G()},100)}})();
