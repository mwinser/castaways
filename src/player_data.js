const playerData = [
    {name: "Sammy", 
    age: 28,
    job: "Unemployed",
    region: "South",
    family: "Single",
    personality:0,
    votesAgainst: 0,
    stamina: 5,
    willpower: 10,
    dexterity: 12,
    intelligence: 15 
    },
    {name: "Barry",
    age: 30,
    job: "Firefighter",
    region: "Midwest",
    family: "Married",
    personality: 6,
    votesAgainst: 0,
    stamina: 16,
    willpower: 12,
    dexterity: 10,
    intelligence: 9 
    },
    {name: "Dan",
    age: 38,
    job: "Powerplant Manager",
    region: "Southwest",
    family: "Has Kids",
    personality: 20,
    votesAgainst: 0,
    stamina: 7,
    willpower: 15,
    dexterity: 10,
    intelligence: 16 
    },
    {name: "Mary",
    age: 40,
    job: "Therapist",
    region: "Midwest",
    family: "Married",
    personality: 10,
    votesAgainst: 0,
    stamina: 5,
    willpower: 20,
    dexterity: 6,
    intelligence: 15 
    },
    {name: "Jude",
    age: 32,
    job: "Astrophysicist",
    region: "Northeast",
    family: "Married",
    personality: 7,
    votesAgainst: 0,
    stamina: 5,
    willpower: 5,
    dexterity: 5,
    intelligence: 20 
    },
    {name: "Clementine",
    age: 18,
    job: "Life Coach",
    region: "Northwest",
    family: "Single",
    personality: 17,
    votesAgainst: 0,
    stamina: 12,
    willpower: 14,
    dexterity: 9,
    intelligence: 12 
    },
    {name: "Candice",
    age: 27,
    job: "Stock Broker",
    region: "Northeast",
    family: "Single",
    personality: 3,
    votesAgainst: 0,
    stamina: 10,
    willpower: 16,
    dexterity: 9,
    intelligence: 15 
    },
    {name: "Craig",
    age: 22,
    age_category: 5,
    job: "Server",
    job_category: 0,
    region: "Southwest",
    family: "Single",
    family_category: 0,
    personality: 8,
    votesAgainst: 0,
    stamina: 13,
    willpower: 11,
    dexterity: 6,
    intelligence: 15 
    }
]

function startingStats() {
    
    
    
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
        switch (player.job) {
            case ("Unemployed"):
            case ("Server"):
                player.job_category = 0
                break
            case ("Powerplant Manager"):
                player.job_category = 5
                break
            case ("Firefighter"):
                player.job_category = 10
                break
            case ("Therapist"):
            case ("Astrophysicist"):
                player.job_category = 15
                break
            case ("Life Coach"):
            case ("Stock Broker"):
                player.job_category = 20
                break
            default:
                console.error(player.name + "'s job value ("+ player.job +") is invalid")
        }

        //starting loyalties based on similarity
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

startingStats()


export default playerData