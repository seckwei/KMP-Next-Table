/** Main Algorithm **/
function nexttable(input){
  // Clears the result area
  document.getElementById("result").innerHTML = " ";
  
  // Split Input into an Array 
  var A = input.split("");
  addLine(A);
  
  // Next table
  var B = new Array(A.length);
  
  B[0] = -1;                    // First value always -1
  B[1] = (A[1]==A[0])? -1 : 0;  // Second value based on equality of first and second element
  
  for(var failPos = 2; failPos < A.length; failPos++){ // start from 2 cause 0 and 1 are done
    var flag = false; // to identify if value for current failPos is assigned or not
    
    for(var i = 1; i < failPos; i++){
      /* comparing sub arrays e.g.
       *            x <--- failed at position 4
       * P = A C A C B
       *       C A C <--- subA
       *       A C A <--- subB
       *  Skipped using sub array from pos 0 because it's obvious to fail'
       */
      var subA = A.slice(i, failPos);
      var subB = A.slice(0, subA.length);
      
      // Returns true is both are same
      var same = compareStrArray(subA, subB);
      
      if(same){
        // Check if the Char below A[failPos] and A[failPos] are not the same
        // If not same, then succeed and move onto next failPos
        if(A[failPos] !== A[subA.length]){
          B[failPos] = subA.length;
          flag = true;
          break;
        }
        else if(subB.length === 1 && subB[0] !== A[failPos]){
          B[failPos] = 0;
          flag = true;
          break;
        }
        else {
          continue;
        }
      }
      else{
        if(subB.length === 1 && subB[0] !== A[failPos]){
          B[failPos] = 0;
          flag = true;
          break;
        }
        else{
          continue;
        }
      }
    }
    
    if(!flag) B[failPos] = -1;
  }
  displayArray(B);
}

/** Helper Functions **/
function compareStrArray(arrA, arrB){
  if(arrA.length != arrB.length){
    return false;
  }
  else {
    for(var i = 0; i < arrA.length; i++){
      if(arrA[i] !== arrB[i]){
        return false;
      }
    }
    return true;
  }
}

function displayArray(arr){
  for(var i = 0; i < arr.length; i++){
    addLine(i + " == " + arr[i]);
  }
}

function addLine(string){
  var div = document.createElement("DIV");
  var t = document.createTextNode(string);
  div.appendChild(t);
  document.getElementById("result").appendChild(div);
}
