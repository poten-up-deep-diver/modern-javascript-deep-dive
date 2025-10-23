const uri = "https://example.com/path/to page?name=John Doe&age=25#section 1";
const encodedURI = encodeURI(uri);
const decodedURI = decodeURI(encodedURI);

console.log("Encoded URI:", encodedURI); // Encoded URI: https://example.com/path/to%20page?name=John%20Doe&age=25#section%201
console.log("Decoded URI:", decodedURI); // Decoded URI: https://example.com/path/to page?name=John Doe&age=25#section 1

const component = "name=John Doe&age=25";
const encodedComponent = encodeURIComponent(component);
const decodedComponent = decodeURIComponent(encodedComponent);

console.log("Encoded Component:", encodedComponent); // Encoded Component: name%3DJohn%20Doe%26age%3D25
console.log("Decoded Component:", decodedComponent); // Decoded Component: name=John Doe&age=25
