export default async function getmatches(sport: string) {
    const allsports = await fetch('https://streamed.su/api/sports');
    const sportIds = await allsports.json();
    const validSport = sportIds.find((sportId: { id: string; }) => sportId.id === sport);


    if (sport === ""){
        return {
            error: 'Please select a sport. Please select from the following:',
            validSports: sportIds.map((sportId: { id: string; }) => sportId.id)
        };
    }
    else if (!validSport) {
        return {
            error: 'Invalid sport. Please select from the following:',
            validSports: sportIds.map((sportId: { id: string; }) => sportId.id)
        };
    }

    const response = await fetch(`https://streamed.su/api/matches/${sport}`);
    const data = await response.json();
    return { data };
}

// Example usage
/*getmatches('basketball').then(result => {
    if (result.error) {
        console.error(result.error);
        console.log(result.validSports);
    } else {
        console.log(result.data);
    
    }
}).catch(error => {
    console.error('Error fetching matches:', error);
});*/