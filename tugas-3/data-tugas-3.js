// example

	// Define vertices data for a cube
	var vertices = [
    // Face A       // Red      // Surface orientation (normal vector)
    -1, -1, -1,     1, 0, 0,    0, 0, -1,    // Index:  0    
     1, -1, -1,     1, 0, 0,    0, 0, -1,    // Index:  1
     1,  1, -1,     1, 0, 0,    0, 0, -1,    // Index:  2
    -1,  1, -1,     1, 0, 0,    0, 0, -1,    // Index:  3
    // Face B       // Yellow
    -1, -1,  1,     1, 1, 0,    0, 0, 1,     // Index:  4
     1, -1,  1,     1, 1, 0,    0, 0, 1,     // Index:  5
     1,  1,  1,     1, 1, 0,    0, 0, 1,     // Index:  6
    -1,  1,  1,     1, 1, 0,    0, 0, 1,     // Index:  7
    // Face C       // Green
    -1, -1, -1,     0, 1, 0,    -1, 0, 0,    // Index:  8
    -1,  1, -1,     0, 1, 0,    -1, 0, 0,    // Index:  9
    -1,  1,  1,     0, 1, 0,    -1, 0, 0,    // Index: 10
    -1, -1,  1,     0, 1, 0,    -1, 0, 0,    // Index: 11
    // Face D       // Blue
     1, -1, -1,     0, 0, 1,    1, 0, 0,     // Index: 12
     1,  1, -1,     0, 0, 1,    1, 0, 0,     // Index: 13
     1,  1,  1,     0, 0, 1,    1, 0, 0,     // Index: 14
     1, -1,  1,     0, 0, 1,    1, 0, 0,     // Index: 15
    // Face E       // Orange
    -1, -1, -1,     1, 0.5, 0,  0, -1, 0,    // Index: 16
    -1, -1,  1,     1, 0.5, 0,  0, -1, 0,    // Index: 17
     1, -1,  1,     1, 0.5, 0,  0, -1, 0,    // Index: 18
     1, -1, -1,     1, 0.5, 0,  0, -1, 0,    // Index: 19
    // Face F       // White
    -1,  1, -1,     1, 1, 1,    0, 1, 0,     // Index: 20
    -1,  1,  1,     1, 1, 1,    0, 1, 0,     // Index: 21
     1,  1,  1,     1, 1, 1,    0, 1, 0,     // Index: 22
     1,  1, -1,     1, 1, 1,    0, 1, 0      // Index: 23
];

var indices = [
    0, 1, 2,     0, 2, 3,     // Face A
    4, 5, 6,     4, 6, 7,     // Face B
    8, 9, 10,    8, 10, 11,   // Face C
    12, 13, 14,  12, 14, 15,  // Face D
    16, 17, 18,  16, 18, 19,  // Face E
    20, 21, 22,  20, 22, 23,  // Face F     
];

	/**
	--->X
	===================
	|				A					|
	===================
		|	b1|     |	c1|
		|		|			|		|
		-----			-----

		--->Z
		================
		|			A				 |
		================
			|B3 B2  B1|
			|	 ----	  |
			---		 ---
	 */

      var chair = {
        // cube_a
        cube_a_a : [-0.8,  0.2, 0.6], //a
        cube_a_b : [ 0.8,  0.2, 0.6], //b
        cube_a_c : [ 0.8, 0.0, 0.6], //c
        cube_a_d : [-0.8, 0.0, 0.6], //d
  
        cube_a_e : [-0.8,  0.2, -0.6], // e
        cube_a_f : [ 0.8,  0.2, -0.6], // f
        cube_a_g : [ 0.8, 0.0, -0.6], // g
        cube_a_h : [-0.8, 0.0, -0.6], // h
  
        // cube_b1
        cube_b1_a : [-0.6, 0.0, 0.4],
        cube_b1_b : [-0.4, 0.0, 0.4],
        cube_b1_c : [-0.4, -0.3, 0.4],
        cube_b1_d : [-0.6, -0.3, 0.4],
  
        cube_b1_e : [-0.6, 0.0, 0.2],
        cube_b1_f : [-0.4, 0.0, 0.2],
        cube_b1_g : [-0.4, -0.3, 0.2],
        cube_b1_h : [-0.6, -0.3, 0.2],
  
        // cube_b2
        cube_b2_a : [-0.6, 0.0, 0.2],
        cube_b2_b : [-0.4, 0.0, 0.2],
        cube_b2_c : [-0.4, -0.2, 0.2],
        cube_b2_d : [-0.6, -0.2, 0.2],
        
        cube_b2_e : [-0.6, 0.0, -0.2],
        cube_b2_f : [-0.4, 0.0, -0.2],
        cube_b2_g : [-0.4, -0.2, -0.2],
        cube_b2_h : [-0.6, -0.2, -0.2],
        
        // cube_b3
        cube_b3_a : [-0.6, 0.0, -0.4],
        cube_b3_b : [-0.4, 0.0, -0.4],
        cube_b3_c : [-0.4, -0.3, -0.4],
        cube_b3_d : [-0.6, -0.3, -0.4],
  
        cube_b3_e : [-0.6, 0.0, -0.2],
        cube_b3_f : [-0.4, 0.0, -0.2],
        cube_b3_g : [-0.4, -0.3, -0.2],
        cube_b3_h : [-0.6, -0.3, -0.2],
        
        // cube_c1
        cube_c1_a : [0.6, 0.0, 0.4],
        cube_c1_b : [0.4, 0.0, 0.4],
        cube_c1_c : [0.4, -0.3, 0.4],
        cube_c1_d : [0.6, -0.3, 0.4],
  
        cube_c1_e : [0.6, 0.0, 0.2],
        cube_c1_f : [0.4, 0.0, 0.2],
        cube_c1_g : [0.4, -0.3, 0.2],
        cube_c1_h : [0.6, -0.3, 0.2],
  
        // cube_c2
        cube_c2_a : [0.6, 0.0, 0.2],
        cube_c2_b : [0.4, 0.0, 0.2],
        cube_c2_c : [0.4, -0.2, 0.2],
        cube_c2_d : [0.6, -0.2, 0.2],
        
        cube_c2_e : [0.6, 0.0, -0.2],
        cube_c2_f : [0.4, 0.0, -0.2],
        cube_c2_g : [0.4, -0.2, -0.2],
        cube_c2_h : [0.6, -0.2, -0.2],
        
        // cube_c3
        cube_c3_a : [0.6, 0.0, -0.4],
        cube_c3_b : [0.4, 0.0, -0.4],
        cube_c3_c : [0.4, -0.3, -0.4],
        cube_c3_d : [0.6, -0.3, -0.4],
  
        cube_c3_e : [0.6, 0.0, -0.2],
        cube_c3_f : [0.4, 0.0, -0.2],
        cube_c3_g : [0.4, -0.3, -0.2],
        cube_c3_h : [0.6, -0.3, -0.2],
    }
  
    // color :)
    var red 		= [ 1, 	 0, 	0 ];
    var yellow 	= [ 1, 	 1, 	0 ];
    var green 	= [ 0, 	 1, 	0 ];
    var blue 		= [ 0, 	 0, 	1 ];
    var orange 	= [ 1, 0.5, 	0 ];
    var white 	= [ 1, 	 1, 	1 ];
  
    // surface orientation :)
    var xp = [1, 0, 0];
    var xn = [-1, 0, 0];
    var yp = [0, 1, 0];
    var yn = [0, -1, 0];
    var zp = [0, 0, 1];
    var zn = [0, 0, -1];
  
    var vertices_ = [
      // cube A
      ...chair.cube_a_a, ...white, ...zp, //0
      ...chair.cube_a_b, ...white, ...zp, //1
      ...chair.cube_a_c, ...white, ...zp, //2
      ...chair.cube_a_d, ...white, ...zp, //3
  
      ...chair.cube_a_e, ...white, ...zn, //4
      ...chair.cube_a_f, ...white, ...zn, //5
      ...chair.cube_a_g, ...white, ...zn, //6
      ...chair.cube_a_h, ...white, ...zn, //7
  
      ...chair.cube_a_b, ...green, ...xp, //8
      ...chair.cube_a_c, ...green, ...xp, //9
      ...chair.cube_a_g, ...green, ...xp, //11
      ...chair.cube_a_f, ...green, ...xp, //10
      
      ...chair.cube_a_a, ...green, ...xn, //12
      ...chair.cube_a_e, ...green, ...xn, //13
      ...chair.cube_a_h, ...green, ...xn, //14
      ...chair.cube_a_d, ...green, ...xn, //15
      
      ...chair.cube_a_a, ...red, ...yp, //16
      ...chair.cube_a_b, ...red, ...yp, //17
      ...chair.cube_a_f, ...red, ...yp, //18
      ...chair.cube_a_e, ...red, ...yp, //19
      
      ...chair.cube_a_d, ...red, ...yn, //20
      ...chair.cube_a_c, ...red, ...yn, //21
      ...chair.cube_a_g, ...red, ...yn, //22
      ...chair.cube_a_h, ...red, ...yn, //23
  
      
      // cube B1
      ...chair.cube_b1_a, ...white, ...zp,
      ...chair.cube_b1_b, ...white, ...zp,
      ...chair.cube_b1_c, ...white, ...zp,
      ...chair.cube_b1_d, ...white, ...zp,
  
      ...chair.cube_b1_e, ...white, ...zn,
      ...chair.cube_b1_f, ...white, ...zn,
      ...chair.cube_b1_g, ...white, ...zn,
      ...chair.cube_b1_h, ...white, ...zn,
      
      ...chair.cube_b1_b, ...green, ...xp,
      ...chair.cube_b1_c, ...green, ...xp,
      ...chair.cube_b1_g, ...green, ...xp,
      ...chair.cube_b1_f, ...green, ...xp,
      
      ...chair.cube_b1_a, ...green, ...xn,
      ...chair.cube_b1_d, ...green, ...xn,
      ...chair.cube_b1_h, ...green, ...xn,
      ...chair.cube_b1_e, ...green, ...xn,
      
      ...chair.cube_b1_a, ...red, ...yp,
      ...chair.cube_b1_b, ...red, ...yp,
      ...chair.cube_b1_f, ...red, ...yp,
      ...chair.cube_b1_e, ...red, ...yp,
      
      ...chair.cube_b1_d, ...red, ...yn,
      ...chair.cube_b1_c, ...red, ...yn,
      ...chair.cube_b1_g, ...red, ...yn,
      ...chair.cube_b1_h, ...red, ...yn,
  
      // cube B2
      ...chair.cube_b2_a, ...white, ...zp,
      ...chair.cube_b2_b, ...white, ...zp,
      ...chair.cube_b2_c, ...white, ...zp,
      ...chair.cube_b2_d, ...white, ...zp,
  
      ...chair.cube_b2_e, ...white, ...zn,
      ...chair.cube_b2_f, ...white, ...zn,
      ...chair.cube_b2_g, ...white, ...zn,
      ...chair.cube_b2_h, ...white, ...zn,
      
      ...chair.cube_b2_b, ...green, ...xp,
      ...chair.cube_b2_c, ...green, ...xp,
      ...chair.cube_b2_g, ...green, ...xp,
      ...chair.cube_b2_f, ...green, ...xp,
      
      ...chair.cube_b2_a, ...green, ...xn,
      ...chair.cube_b2_d, ...green, ...xn,
      ...chair.cube_b2_h, ...green, ...xn,
      ...chair.cube_b2_e, ...green, ...xn,
      
      ...chair.cube_b2_a, ...red, ...yp,
      ...chair.cube_b2_b, ...red, ...yp,
      ...chair.cube_b2_f, ...red, ...yp,
      ...chair.cube_b2_e, ...red, ...yp,
      
      ...chair.cube_b2_d, ...red, ...yn,
      ...chair.cube_b2_c, ...red, ...yn,
      ...chair.cube_b2_g, ...red, ...yn,
      ...chair.cube_b2_h, ...red, ...yn,
  
      // cube B3
      ...chair.cube_b3_a, ...white, ...zp,
      ...chair.cube_b3_b, ...white, ...zp,
      ...chair.cube_b3_c, ...white, ...zp,
      ...chair.cube_b3_d, ...white, ...zp,
  
      ...chair.cube_b3_e, ...white, ...zn,
      ...chair.cube_b3_f, ...white, ...zn,
      ...chair.cube_b3_g, ...white, ...zn,
      ...chair.cube_b3_h, ...white, ...zn,
      
      ...chair.cube_b3_b, ...green, ...xp,
      ...chair.cube_b3_c, ...green, ...xp,
      ...chair.cube_b3_g, ...green, ...xp,
      ...chair.cube_b3_f, ...green, ...xp,
      
      ...chair.cube_b3_a, ...green, ...xn,
      ...chair.cube_b3_d, ...green, ...xn,
      ...chair.cube_b3_h, ...green, ...xn,
      ...chair.cube_b3_e, ...green, ...xn,
      
      ...chair.cube_b3_a, ...red, ...yp,
      ...chair.cube_b3_b, ...red, ...yp,
      ...chair.cube_b3_f, ...red, ...yp,
      ...chair.cube_b3_e, ...red, ...yp,
      
      ...chair.cube_b3_d, ...red, ...yn,
      ...chair.cube_b3_c, ...red, ...yn,
      ...chair.cube_b3_g, ...red, ...yn,
      ...chair.cube_b3_h, ...red, ...yn,
  
      // cube C1
      ...chair.cube_c1_a, ...white, ...zp,
      ...chair.cube_c1_b, ...white, ...zp,
      ...chair.cube_c1_c, ...white, ...zp,
      ...chair.cube_c1_d, ...white, ...zp,
  
      ...chair.cube_c1_e, ...white, ...zn,
      ...chair.cube_c1_f, ...white, ...zn,
      ...chair.cube_c1_g, ...white, ...zn,
      ...chair.cube_c1_h, ...white, ...zn,
      
      ...chair.cube_c1_b, ...green, ...xn,
      ...chair.cube_c1_c, ...green, ...xn,
      ...chair.cube_c1_g, ...green, ...xn,
      ...chair.cube_c1_f, ...green, ...xn,
      
      ...chair.cube_c1_a, ...green, ...xp,
      ...chair.cube_c1_d, ...green, ...xp,
      ...chair.cube_c1_h, ...green, ...xp,
      ...chair.cube_c1_e, ...green, ...xp,
      
      ...chair.cube_c1_a, ...red, ...yp,
      ...chair.cube_c1_b, ...red, ...yp,
      ...chair.cube_c1_f, ...red, ...yp,
      ...chair.cube_c1_e, ...red, ...yp,
      
      ...chair.cube_c1_d, ...red, ...yn,
      ...chair.cube_c1_c, ...red, ...yn,
      ...chair.cube_c1_g, ...red, ...yn,
      ...chair.cube_c1_h, ...red, ...yn,
  
      // cube C2
      ...chair.cube_c2_a, ...white, ...zp,
      ...chair.cube_c2_b, ...white, ...zp,
      ...chair.cube_c2_c, ...white, ...zp,
      ...chair.cube_c2_d, ...white, ...zp,
  
      ...chair.cube_c2_e, ...white, ...zn,
      ...chair.cube_c2_f, ...white, ...zn,
      ...chair.cube_c2_g, ...white, ...zn,
      ...chair.cube_c2_h, ...white, ...zn,
      
      ...chair.cube_c2_b, ...green, ...xn,
      ...chair.cube_c2_c, ...green, ...xn,
      ...chair.cube_c2_g, ...green, ...xn,
      ...chair.cube_c2_f, ...green, ...xn,
      
      ...chair.cube_c2_a, ...green, ...xp,
      ...chair.cube_c2_d, ...green, ...xp,
      ...chair.cube_c2_h, ...green, ...xp,
      ...chair.cube_c2_e, ...green, ...xp,
      
      ...chair.cube_c2_a, ...red, ...yp,
      ...chair.cube_c2_b, ...red, ...yp,
      ...chair.cube_c2_f, ...red, ...yp,
      ...chair.cube_c2_e, ...red, ...yp,
      
      ...chair.cube_c2_d, ...red, ...yn,
      ...chair.cube_c2_c, ...red, ...yn,
      ...chair.cube_c2_g, ...red, ...yn,
      ...chair.cube_c2_h, ...red, ...yn,
  
      // cube C3
      ...chair.cube_c3_a, ...white, ...zp,
      ...chair.cube_c3_b, ...white, ...zp,
      ...chair.cube_c3_c, ...white, ...zp,
      ...chair.cube_c3_d, ...white, ...zp,
  
      ...chair.cube_c3_e, ...white, ...zn,
      ...chair.cube_c3_f, ...white, ...zn,
      ...chair.cube_c3_g, ...white, ...zn,
      ...chair.cube_c3_h, ...white, ...zn,
      
      ...chair.cube_c3_b, ...green, ...xn,
      ...chair.cube_c3_c, ...green, ...xn,
      ...chair.cube_c3_g, ...green, ...xn,
      ...chair.cube_c3_f, ...green, ...xn,
      
      ...chair.cube_c3_a, ...green, ...xp,
      ...chair.cube_c3_d, ...green, ...xp,
      ...chair.cube_c3_h, ...green, ...xp,
      ...chair.cube_c3_e, ...green, ...xp,
      
      ...chair.cube_c3_a, ...red, ...yp,
      ...chair.cube_c3_b, ...red, ...yp,
      ...chair.cube_c3_f, ...red, ...yp,
      ...chair.cube_c3_e, ...red, ...yp,
      
      ...chair.cube_c3_d, ...red, ...yn,
      ...chair.cube_c3_c, ...red, ...yn,
      ...chair.cube_c3_g, ...red, ...yn,
      ...chair.cube_c3_h, ...red, ...yn,
      
    ];
  
    var cube_b1_i = 24;
    var cube_b2_i = 24 * 2;
    var cube_b3_i = 24 * 3;
    var cube_c1_i = 24 * 4;
    var cube_c2_i = 24 * 5;
    var cube_c3_i = 24 * 6;
  
    var indices_ = [
      // cube A
      // 0, 2, 3,
      
      0, 1, 2,     0, 2, 3,     // Face A
      4, 5, 6,     4, 6, 7,     // Face B
      8, 9, 10,    8, 10, 11,   // Face C
      12, 13, 14,  12, 14, 15,  // Face D
      16, 17, 18,  16, 18, 19,  // Face E
      20, 21, 22,  20, 22, 23,  // Face F 
  
      
      // cube b1
      0 + cube_b1_i, 1 + cube_b1_i, 2 + cube_b1_i,     0 + cube_b1_i, 2 + cube_b1_i, 3 + cube_b1_i,     // Face A
      4 + cube_b1_i, 5 + cube_b1_i, 6 + cube_b1_i,     4 + cube_b1_i, 6 + cube_b1_i, 7 + cube_b1_i,     // Face B
      8 + cube_b1_i, 9 + cube_b1_i, 10 + cube_b1_i,    8 + cube_b1_i, 10 + cube_b1_i, 11 + cube_b1_i,   // Face C
      12 + cube_b1_i, 13 + cube_b1_i, 14 + cube_b1_i,  12 + cube_b1_i, 14 + cube_b1_i, 15 + cube_b1_i,  // Face D
      16 + cube_b1_i, 17 + cube_b1_i, 18 + cube_b1_i,  16 + cube_b1_i, 18 + cube_b1_i, 19 + cube_b1_i,  // Face E
      20 + cube_b1_i, 21 + cube_b1_i, 22 + cube_b1_i,  20 + cube_b1_i, 22 + cube_b1_i, 23 + cube_b1_i,  // Face F 
  
      // cube b2
      0 + cube_b2_i, 1 + cube_b2_i, 2 + cube_b2_i,     0 + cube_b2_i, 2 + cube_b2_i, 3 + cube_b2_i,     // Face A
      4 + cube_b2_i, 5 + cube_b2_i, 6 + cube_b2_i,     4 + cube_b2_i, 6 + cube_b2_i, 7 + cube_b2_i,     // Face B
      8 + cube_b2_i, 9 + cube_b2_i, 10 + cube_b2_i,    8 + cube_b2_i, 10 + cube_b2_i, 11 + cube_b2_i,   // Face C
      12 + cube_b2_i, 13 + cube_b2_i, 14 + cube_b2_i,  12 + cube_b2_i, 14 + cube_b2_i, 15 + cube_b2_i,  // Face D
      16 + cube_b2_i, 17 + cube_b2_i, 18 + cube_b2_i,  16 + cube_b2_i, 18 + cube_b2_i, 19 + cube_b2_i,  // Face E
      20 + cube_b2_i, 21 + cube_b2_i, 22 + cube_b2_i,  20 + cube_b2_i, 22 + cube_b2_i, 23 + cube_b2_i,  // Face F 
      
      // cube b3
      0 + cube_b3_i, 1 + cube_b3_i, 2 + cube_b3_i,     0 + cube_b3_i, 2 + cube_b3_i, 3 + cube_b3_i,     // Face A
      4 + cube_b3_i, 5 + cube_b3_i, 6 + cube_b3_i,     4 + cube_b3_i, 6 + cube_b3_i, 7 + cube_b3_i,     // Face B
      8 + cube_b3_i, 9 + cube_b3_i, 10 + cube_b3_i,    8 + cube_b3_i, 10 + cube_b3_i, 11 + cube_b3_i,   // Face C
      12 + cube_b3_i, 13 + cube_b3_i, 14 + cube_b3_i,  12 + cube_b3_i, 14 + cube_b3_i, 15 + cube_b3_i,  // Face D
      16 + cube_b3_i, 17 + cube_b3_i, 18 + cube_b3_i,  16 + cube_b3_i, 18 + cube_b3_i, 19 + cube_b3_i,  // Face E
      20 + cube_b3_i, 21 + cube_b3_i, 22 + cube_b3_i,  20 + cube_b3_i, 22 + cube_b3_i, 23 + cube_b3_i,  // Face F 
      
      // cube c1
      0 + cube_c1_i, 1 + cube_c1_i, 2 + cube_c1_i,     0 + cube_c1_i, 2 + cube_c1_i, 3 + cube_c1_i,     // Face A
      4 + cube_c1_i, 5 + cube_c1_i, 6 + cube_c1_i,     4 + cube_c1_i, 6 + cube_c1_i, 7 + cube_c1_i,     // Face B
      8 + cube_c1_i, 9 + cube_c1_i, 10 + cube_c1_i,    8 + cube_c1_i, 10 + cube_c1_i, 11 + cube_c1_i,   // Face C
      12 + cube_c1_i, 13 + cube_c1_i, 14 + cube_c1_i,  12 + cube_c1_i, 14 + cube_c1_i, 15 + cube_c1_i,  // Face D
      16 + cube_c1_i, 17 + cube_c1_i, 18 + cube_c1_i,  16 + cube_c1_i, 18 + cube_c1_i, 19 + cube_c1_i,  // Face E
      20 + cube_c1_i, 21 + cube_c1_i, 22 + cube_c1_i,  20 + cube_c1_i, 22 + cube_c1_i, 23 + cube_c1_i,  // Face F 
  
      // cube c2
      0 + cube_c2_i, 1 + cube_c2_i, 2 + cube_c2_i,     0 + cube_c2_i, 2 + cube_c2_i, 3 + cube_c2_i,     // Face A
      4 + cube_c2_i, 5 + cube_c2_i, 6 + cube_c2_i,     4 + cube_c2_i, 6 + cube_c2_i, 7 + cube_c2_i,     // Face B
      8 + cube_c2_i, 9 + cube_c2_i, 10 + cube_c2_i,    8 + cube_c2_i, 10 + cube_c2_i, 11 + cube_c2_i,   // Face C
      12 + cube_c2_i, 13 + cube_c2_i, 14 + cube_c2_i,  12 + cube_c2_i, 14 + cube_c2_i, 15 + cube_c2_i,  // Face D
      16 + cube_c2_i, 17 + cube_c2_i, 18 + cube_c2_i,  16 + cube_c2_i, 18 + cube_c2_i, 19 + cube_c2_i,  // Face E
      20 + cube_c2_i, 21 + cube_c2_i, 22 + cube_c2_i,  20 + cube_c2_i, 22 + cube_c2_i, 23 + cube_c2_i,  // Face F 
      
      // cube c3
      0 + cube_c3_i, 1 + cube_c3_i, 2 + cube_c3_i,     0 + cube_c3_i, 2 + cube_c3_i, 3 + cube_c3_i,     // Face A
      4 + cube_c3_i, 5 + cube_c3_i, 6 + cube_c3_i,     4 + cube_c3_i, 6 + cube_c3_i, 7 + cube_c3_i,     // Face B
      8 + cube_c3_i, 9 + cube_c3_i, 10 + cube_c3_i,    8 + cube_c3_i, 10 + cube_c3_i, 11 + cube_c3_i,   // Face C
      12 + cube_c3_i, 13 + cube_c3_i, 14 + cube_c3_i,  12 + cube_c3_i, 14 + cube_c3_i, 15 + cube_c3_i,  // Face D
      16 + cube_c3_i, 17 + cube_c3_i, 18 + cube_c3_i,  16 + cube_c3_i, 18 + cube_c3_i, 19 + cube_c3_i,  // Face E
      20 + cube_c3_i, 21 + cube_c3_i, 22 + cube_c3_i,  20 + cube_c3_i, 22 + cube_c3_i, 23 + cube_c3_i,  // Face F 
      
    ];

    // color = #053053
    /**
     * 05 / EE -> R
     * 30 / EE -> G
     * 53 / EE -> B
     * 
     * decimal ver
     * 5 / 255
     * (30)H -> 3*16 + 0*1 = (48)D / 255
     * (53)H -> 5*16 + 3*1 = (83)D / 255
     * 
     * color in RGB
     * 5.0/255.0 , 48.0/255.0, 83.0/255.0
     */
    var plane_color = [5.0/255.0 , 48.0/255.0, 83.0/255.0];
    var plane = [
      20.0, -0.3, 20.0,  ...plane_color, ...yp,
      20.0, -0.3, -20.0, ...plane_color, ...yp,
      -20.0, -0.3, -20.0, ...plane_color, ...yp,
      -20.0, -0.3, 20.0, ...plane_color, ...yp,
    ];

    var indices_place = [
      0, 1, 2,     0, 2, 3,    
    ];