// function getIntersection(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy){
//     const tTop=(Dx-Cx)*(Ay-Cy)-(Dy-Cy)*(Ax-Cx);
//     const uTop=(Cy-Ay)*(Ax-Bx)-(Cx-Ax)*(Ay-By);
//     const bottom=(Dy-Cy)*(Bx-Ax)-(Dx-Cx)*(By-Ay);
//
//     if (bottom!=0){
//         const t=tTop/bottom;
//         const u=uTop/bottom;
//         if(t>=0 && t<=1 && u>=0 && u<=1){
//             return {
//                 x:lerp(Ax,Bx,t),
//                 y:lerp(Ay,By,t),
//                 offset:t
//             }
//         }
//     }
//
//     return null;
// }