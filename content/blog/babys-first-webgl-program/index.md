---
title: Baby's First WebGL Program
date: "2020-06-18T15:42:03.284Z"
description: "A quick guide on creating your first WebGL program"
---

WebGL is a rasterization engine. Rasterization is the task of taking shapes represented as vectors and converting it into a raster image (a collection of points and lines).

## Shaders

To use WebGL we provide two functions, called _shaders_ which are written in a C-like language called _GLSL_:

1. Vertex Shader
2. Fragment Shader

The two together make up a _shader program_.

When rasterizing (running the program), WebGL sets up some state for these functions and runs them consecutively by calling `gl.drawArrays` or `gl.drawElements`.

### 1) Vertex Shader

It computes the position of vertices. Depending on what the vertex shader function returns, WebGL rasterizes points, lines or triangles.

### 2) Fragment Shader

It computes the color for each pixel being rasterized.

## Shader Data

When WebGL sets up state for the shaders, it can be passed to the shaders in the following ways:

1. Uniforms
2. Buffers and Attributes
3. Textures
4. Varyings

### 1) Uniforms

They're basically global variables which the shaders can access.

### 2) Buffers and Attributes

#### Buffers

Arrays of binary data which are uploaded to the GPU. You can put whatever you want in them, usually things like: _positions, normals, texture coordinates, vertex colors_.

Buffers are not random-access. Every time shaders are run, the buffer is sequentially read and assigned to an attribute.

#### Attributes

They specify how the binary data should be pulled from the buffers (the offset of each attribute, its size in bytes etc.).

### 3) Textures

Unlike buffers they're random-access arrays of data which are commonly used for, but not limited to, holding image data.

### 4) Varyings

Values used for passing data between shaders. When a varying variable is defined on the vertex shader, its value will be interpolated on the fragment shader.

## Creating a Program

When creating a WebGL program, it uses its own coordinate space, called the _clip space_. It goes from -1 to 1 on each dimension (x, y, z) and everything beyond that is clipped, hence the name.

The vertex shader takes care of providing clip space coordinates for the data we want to render, while the fragment shader provides color information.

Let's write a vertex shader:

```cpp
// an attribute, maps every 4 values (vec4) of the buffer to a_position
attribute vec4 a_position;

// the shader function
void main() {
  // special variable the vertex shader sets
  gl_Position = a_position;
}
```

Let's write a fragment shader:

```cpp
// fragment shaders need a precision specified, mediump = medium precision
precision mediump float;

void main() {
  // special variable the vertex shader sets
  gl_FragColor = vec4(1, 0, 0.5, 1);  // = RGBA(255, 0, 127, 255)
}
```

Let's create a web projects with a canvas where WebGL will render:

```html
<canvas id="c"></canvas>

<script>
  const canvas = document.querySelector("#c") // Gets the canvas element
  const gl = canvas.getContext("webgl") // Gets a WebGL context for the canvas
</script>
```

We'll store the shaders we defined earlier into strings (since we will be using JavaScript).

```js
const vertSrc = `...`
const fragSrc = `...`
```

Write a function that will create a shader from the source (strings or tags) we created:

```js
function createShader(gl, type, source) {
  const shader = gl.createShader(type) // creates a shader

  gl.shaderSource(shader, source) // attaches the source
  gl.compileShader(shader) // compiles the source

  // Error Handling
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  }
  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}
```

And finally create the two shaders:

```js
const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc)
const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc)
```

We also need to write a function that will link the shaders to create a program:

```js
function createProgram(gl, vertShader, fragShader) {
  const program = gl.createProgram() // creates a program

  gl.attachShader(program, vertShader) // attaches the vertex shader
  gl.attachShader(program, fragShader) // attaches the fragment shader
  gl.linkProgram(program) // links the two shaders together

  // Error Handling
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}
```

And create the program:

```js
const program = createProgram(gl, vertShader, fragShader)
```

## Initialization

After we have created the program we can initialize its environment.

We can get the location of an attribute to later reference it. We can also get the buffer and save data on it.

```js
const positionAttrLoc = gl.getAttribLocation(program, "a_position") // gets the attribute location

const positionBuffer = gl.createBuffer() // creates a buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer) // binds the buffer to a bind point (ARRAY_BUFFER) so it can be referenced elsewhere

// A triangle - three 2D points stored in a Float32Array (WebGL requires strong typing)
const triangle = new Float32Array([0, 0, 0, 0.5, 0.7, 0])

// copies the triangle to the buffer at the ARRAY_BUFFER bind point
gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW) // STATIC_DRAW - tells WebGL the data will be static (not likely to change)
```

## Rendering

First, let's create a function to resize the canvas. This is optional, but helps with HD-DPI displays as CSS pixels do not always map to real pixels (smartphones etc.).

```js
function resize(gl) {
  const w = Math.floor(gl.canvas.clientWidth * window.devicePixelRatio)
  const h = Math.floor(gl.canvas.clientHeight * window.devicePixelRatio)

  gl.canvas.width !== w && (gl.canvas.width = w)
  gl.canvas.height !== h && (gl.canvas.height = h)
}

resize(gl)
```

Let's define how WebGLs clip space relates to our canvas. On the `x` axis `-1 <-> 1` for us means `0 <-> canvas.width` and on the `y` axis `0 <-> canvas.height`.

```js
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
```

And let's also clear the canvas color:

```js
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)
```

Now we can use the program we defined on the gl context:

```js
gl.useProgram(program)
```

Next, we'll setup the attributes.

```js
gl.enableVertexAttribArray(positionAttrLoc)
```

And the buffer.

```js
// bind the positionBuffer to the gl.ARRAY_BUFFER bind point
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

// a_positon is vec4 [x,y,z,w], size 2 tells it to get [x,y] from the buffer and default the rest
const size = 2
const type = gl.FLOAT // data type is Float32
const normalize = false // don't normalize the data
const stride = 0 // 0 = no skipping bytes, we move to the next element (size * sizeof(el))
const offset = 0 // 0 = start at first byte

gl.vertexAttribPointer(positionAttrLoc, size, type, normalize, stride, offset)
// positionBuffer (on ARRAY_BUFFER) was bound to the attribute, ARRAY_BUFFER is now free to be rebound
```

We can now run our program:

```js
const primitiveType = gl.TRIANGLES // we need to draw a triangle
const offset = 0 // start at the beginning of the triangle array
const count = 3 // we have 6 elements, corresponding to 3 points

gl.drawArrays(primitiveType, offset, count)
```

In our vertex shader we are using clip space coordinates, the real coordinates would be like this if the canvas was 400x300 px.

| clip space | screen space |
| ---------- | ------------ |
| 0, 0       | 200, 150     |
| 0, 0.5     | 200, 225     |
| 0.7, 0     | 340, 150     |

And in our fragment shader we are using normalized values for `gl_FragColor` which expressed in RGBA (8 bits per channel) would be:

| gl_FragColor | RGBA             |
| ------------ | ---------------- |
| 1, 0, 0.5, 1 | 255, 0, 127, 255 |

Here's the full example:

```html
<canvas id="c"></canvas>

<script>
  function createShader(gl, type, source) {
    const shader = gl.createShader(type)

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
  }

  function createProgram(gl, vertShader, fragShader) {
    const program = gl.createProgram()

    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return program
    }

    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
  }

  function resize(gl) {
    const w = Math.floor(gl.canvas.clientWidth * window.devicePixelRatio)
    const h = Math.floor(gl.canvas.clientHeight * window.devicePixelRatio)

    gl.canvas.width !== w && (gl.canvas.width = w)
    gl.canvas.height !== h && (gl.canvas.height = h)
  }
</script>

<script>
  const canvas = document.querySelector("#c")
  const gl = canvas.getContext("webgl")

  const vertSrc = `
    attribute vec4 a_position; 

    void main() {
      gl_Position = a_position; 
    }
  `

  const fragSrc = `
    precision mediump float; 

    void main() {
      gl_FragColor = vec4(1, 0, 0.5, 1);
    }
  `

  const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc)
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc)

  const program = createProgram(gl, vertShader, fragShader)

  // Initialization

  const positionAttrLoc = gl.getAttribLocation(program, "a_position")

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const triangle = new Float32Array([0, 0, 0, 0.5, 0.7, 0])

  gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW)

  // Rendering

  resize(gl)

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.enableVertexAttribArray(positionAttrLoc)

  gl.vertexAttribPointer(positionAttrLoc, 2, gl.FLOAT, false, 0, 0)

  gl.drawArrays(gl.TRIANGLES, 0, 3)
</script>
```
