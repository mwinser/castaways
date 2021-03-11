const playerData = []

function startingStats(numPlayers) {
    var names = ["Sammy", "Barry", "Dan", "Candice", "Clementine", "Ziggy", "Adam", "Alex", "Ambrosia", "Tony", "Tina", "Jude", "DeShawn", "Mike", "Stevie", "Sam", "Elliot", "Rob", "Roberto", "Robbie", "Bobby", "Amy", "Beth", "Charlie", "Freya", "Dom", "Latoya"]
    const jobs = ["Unemployed", "Server","Student","Powerplant Manager", "Construction Worker","Truck Driver","Firefighter", "Cop","Soldier","Therapist", "Astrophysicist","Professor","Life Coach", "Stock Broker","Lawyer"]
    const regions = ["Northeast", "South", "Midwest", "Northwest", "Southwest"]
    const families = ["Single", "Married", "Has Kids"]
    
    //function to make sure no names are chosen twice
    function pickName(){
        let number = ~~(Math.random()*names.length)
        let name = names[number]
        names.splice(number, 1)
        return name
    }
    //function to make sure no jobs are chosen twice
    function pickJob(){
        let number = ~~(Math.random()*jobs.length)
        let job = jobs[number]
        jobs.splice(number, 1)
        return job
    }
    for (let i=0;i<numPlayers;i++){
        //create random player
        const rando = {
            name: pickName(),
            age: 18 + ~~(Math.random()*(45-18)),
            job: pickJob(),
            region: regions[~~(Math.random()*regions.length)],
            family: families[~~(Math.random()*families.length)],
            personality: ~~(Math.random()*20),
            votesAgainst: 0,
            stamina: ~~(Math.random()*20),
            willpower: ~~(Math.random()*20),
            dexterity: ~~(Math.random()*20),
            intelligence: ~~(Math.random()*20),
            }
        playerData.push(rando)
    }


    playerData.forEach(player=>{
        //set categories
        //Age
        switch (true) {
            case player.age<20:
                player.age_category = 0
                break
            case player.age<25:
                player.age_category = 5
                break
            case player.age<30:
                player.age_category = 10
                break
            case player.age<40:
                player.age_category = 15
                break
            default:
                player.age_category = 20
        }
        //Family
        switch (player.family) {
            case "Single":
                player.family_category = 0
                break
            case "Married":
                player.family_category = 10
                break
            case "Has Kids":
                player.family_category = 20
                break
            default:
                console.error(player.name + "'s family value ("+ player.family +") is invalid")
        }
        //Job
        switch (true) {
            case ["Unemployed", "Server","Student"].some(job=> job===player.job):
                player.job_category = 0
                break
            case ["Powerplant Manager", "Construction Worker","Truck Driver"].some(job=> job===player.job):
                player.job_category = 5
                break
            case ["Firefighter", "Cop","Soldier"].some(job=> job===player.job):
                player.job_category = 10
                break
            case ["Therapist", "Astrophysicist","Professor"].some(job=> job===player.job):    
                player.job_category = 15
                break
            case ["Life Coach", "Stock Broker","Lawyer"].some(job=> job===player.job):
                player.job_category = 20
                break
            default:
                console.error(player.name + "'s job value ("+ player.job +") is invalid")
        }
    })
}

function startingLoyalties() {
    //starting loyalties based on similarity
    playerData.forEach(player=>{
        const loyaltyRatings = {}
        playerData.forEach(rival=>{
            const region = 20*(player.region===rival.region)
            const job = 20-Math.abs(player.job_category-rival.job_category)
            const personality = 20-Math.abs(player.personality-rival.personality)
            const family = 20-Math.abs(player.family_category-rival.family_category)
            const age = 20-Math.abs(player.age_category-rival.age_category)
            loyaltyRatings[rival.name]=region+job+personality+family+age
            
        })
        player["loyalty"] = loyaltyRatings 
    })
}


startingStats(8)
startingLoyalties()

export default playerData