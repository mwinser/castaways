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
    physical: 5,
    mental: 10,
    social: 15
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
    physical: 18,
    mental: 10,
    social: 11
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
    physical: 10,
    mental: 16,
    social: 12
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
    physical: 8,
    mental: 15,
    social: 18
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
    physical: 9,
    mental: 20,
    social: 8
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
    physical: 13,
    mental: 9,
    social: 14
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
    physical: 15,
    mental: 16,
    social: 12
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
    physical: 16,
    mental: 13,
    social: 11
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