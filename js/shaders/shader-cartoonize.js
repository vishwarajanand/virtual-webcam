// "Cartoonize CRT cam" by @iq https://www.shadertoy.com/view/XsfGDl

const shaderCartoonize = `
#define PIXELSIZE 3.0

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 cor;
	
	cor.x =  fragCoord.x/PIXELSIZE;
	cor.y = (fragCoord.y+PIXELSIZE*1.5*mod(floor(cor.x),1.5))/(PIXELSIZE*3.0);
	
	vec2 ico = floor( cor );
	vec2 fco = fract( cor );
	
	vec3 pix = step( 1.5, mod( vec3(0.0,1.0,2.0) + ico.x, 3.0 ) );
	vec3 ima = texture2D( iChannel0,PIXELSIZE*ico*vec2(1.0,3.0)/iResolution.xy ).xyz;
	
	vec3 col = pix*dot( pix, ima );

    col *= step( abs(fco.x-0.5), 0.4 );
    col *= step( abs(fco.y-0.5), 0.4 );
	
	col *= 1.2;
	fragColor = vec4( col, 1.0 );
}
 `;

export { shaderCartoonize }
