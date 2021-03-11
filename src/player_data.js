const playerData = [
    {name: "Sammy", 
    age: 28,
    age_category: 10,
    job: "Unemployed",
    job_category: 1,
    region: "South",
    family: "Single",
    family_category: 0,
    personality:0,
    votesAgainst: 0,
    stamina: 5,
    willpower: 10,
    dexterity: 12,
    intelligence: 15 
    },
    {name: "Barry",
    age: 30,
    age_category: 15,
    job: "Firefighter",
    job_category: 3,
    region: "Midwest",
    family: "Married",
    family_category: 10,
    personality: 6,
    votesAgainst: 0,
    stamina: 16,
    willpower: 12,
    dexterity: 10,
    intelligence: 9 
    },
    {name: "Dan",
    age: 38,
    age_category: 15,
    job: "Powerplant Manager",
    job_category: 2,
    region: "Southwest",
    family: "Has Kids",
    family_category: 10,
    personality: 20,
    votesAgainst: 0,
    stamina: 7,
    willpower: 15,
    dexterity: 10,
    intelligence: 16 
    },
    {name: "Mary",
    age: 40,
    age_category: 20,
    job: "Therapist",
    job_category: 4,
    region: "Midwest",
    family: "Married",
    family_category: 10,
    personality: 10,
    votesAgainst: 0,
    stamina: 5,
    willpower: 20,
    dexterity: 6,
    intelligence: 15 
    },
    {name: "Jude",
    age: 32,
    age_category: 15,
    job: "Astrophysicist",
    job_category: 4,
    region: "Northeast",
    family: "Married",
    family_category: 10,
    personality: 7,
    votesAgainst: 0,
    stamina: 5,
    willpower: 5,
    dexterity: 5,
    intelligence: 20 
    },
    {name: "Clementine",
    age: 18,
    age_category: 0,
    job: "Life Coach",
    job_category: 5,
    region: "Northwest",
    family: "Single",
    family_category: 0,
    personality: 17,
    votesAgainst: 0,
    stamina: 12,
    willpower: 14,
    dexterity: 9,
    intelligence: 12 
    },
    {name: "Candice",
    age: 27,
    age_category: 10,
    job: "Stock Broker",
    job_category: 5,
    region: "Northeast",
    family: "Single",
    family_category: 0,
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
    job: "Freelancer",
    job_category: 5,
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

function baseLoyalty() {
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

baseLoyalty()


export default playerData