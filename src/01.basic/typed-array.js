var f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];

f64a


// Floating point arrays.
var f64 = new Float64Array(8);
var f32 = new Float32Array(16);

// Signed integer arrays.
var i32 = new Int32Array(16);
var i16 = new Int16Array(32);
var i8 = new Int8Array(64);

// Unsigned integer arrays.
var u32 = new Uint32Array(16);
var u16 = new Uint16Array(32);
var u8 = new Uint8Array(64);
var pixels = new Uint8ClampedArray(64);


var ab = new ArrayBuffer(256); // 256-byte ArrayBuffer.
var faFull = new Uint8Array(ab);
var faFirstHalf = new Uint8Array(ab, 0, 128);
var faThirdQuarter = new Uint8Array(ab, 128, 64);
var faRest = new Uint8Array(ab, 192);

// Copy
function memcpy(dst, dstOffset, src, srcOffset, length) {
  var dstU8 = new Uint8Array(dst, dstOffset, length);
  var srcU8 = new Uint8Array(src, srcOffset, length);
  dstU8.set(srcU8);
};

// Dataview
var dv = new DataView(ab);
var vector_length = dv.getUint8(0);
var width = dv.getUint16(1); // 0+uint8 = 1 bytes offset
var height = dv.getUint16(3); // 0+uint8+uint16 = 3 bytes offset
var vectors = new Float32Array(width*height*vector_length);
for (var i=0, off=5; i<vectors.length; i++, off+=4) {
  vectors[i] = dv.getFloat32(off);
}


let buffer = new ArrayBuffer(16); // create a buffer of length 16
let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

console.log(Uint32Array.BYTES_PER_ELEMENT)
console.log(view.length)
console.log(view.byteLength)

view[0] = 1234

for(let num of view) {
  console.log(num);
}
