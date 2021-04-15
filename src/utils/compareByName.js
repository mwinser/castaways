  
  
//for sorting player cards alphabetically
export default function compareByName(a,b){
    const playerA = a.name.toUpperCase();
    const playerB = b.name.toUpperCase();

    let comparison = 0;
    if (playerA > playerB) {
    comparison = 1;
    } else if (playerA < playerB) {
    comparison = -1;
    }
    return comparison;
}