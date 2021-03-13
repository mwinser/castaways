const stayedAtCamp = [
    {
        string: " made everyone laugh.",
        change: 5,
        players: 1
    },
    {
        string: " was appreciated for helping out around camp.",
        change: 10,
        players: 1
    },
    {
        string: " burned the rice.",
        change: -5,
        players: 1
    },
    {
        string: " was hanging out at camp too much",
        change: -10,
        players: 1
    },
    {
        string: " let one of the chickens loose.",
        change: -20,
        players: 1
    },
    {
        string: " found they had something in common.",
        change: 5,
        players: 2
    },
    {
        string: " had a deep conversation.",
        change: 10,
        players: 2
    },
    {
        string: " became friends.",
        change: 20,
        players: 2
    },
    {
        string: " formed a secret alliance.",
        change: 30,
        players: 2
    },
    {
        string: " had a minor disagreement.",
        change: -5,
        players: 2
    },
    {
        string: " had a heated argument.",
        change: -10,
        players: 2
    },
    {
        string: " had a major social fight.",
        change: -20,
        players: 2
    },
    {
        string: " had a major falling-out.",
        change: -30,
        players: 2
    }
]
const leftCamp = [
    {
        string: " refilled everyone's water bottles.",
        change: 5,
        players: 1
    },
    {
        string: " was appreciated for bringing back firewood.",
        change: 10,
        players: 1
    },
    {
        string: " forgot to refill water bottles.",
        change: -5,
        players: 1
    },
    {
        string: " was gone for too long",
        change: -10,
        players: 1
    },
    {
        string: " caught a wild chicken.",
        change: 20,
        players: 1
    },
    {
        string: " found an immunity idol.",
        idol: true
    }
]


const onePlayerEvents = [
    {
        string: " said something funny.",
        change: 5
    },
    {
        string: " helped out around camp.",
        change: 10
    },
    {
        string: " caught fish for dinner.",
        change: 20
    },
    {
        string: " won a feast for the whole tribe.",
        change: 30
    },
    {
        string: " burned the rice.",
        change: -5
    },
    {
        string: " has been looking for idols.",
        change: -10
    },
    {
        string: " got caught stealing food.",
        change: -20
    },
    {
        string: " lost a feast challenge for the whole tribe.",
        change: -30
    }
]

const twoPlayerEvents = [
    {
        string: " found they had something in common.",
        change: 5
    },
    {
        string: " had a deep conversation.",
        change: 10
    },
    {
        string: " became friends.",
        change: 20
    },
    {
        string: " formed a secret alliance.",
        change: 30
    },
    {
        string: " had a minor disagreement.",
        change: -5
    },
    {
        string: " had a heated argument.",
        change: -10
    },
    {
        string: " had a major social fight.",
        change: -20
    },
    {
        string: " had a major falling-out.",
        change: -30
    }
]


export {onePlayerEvents, twoPlayerEvents, leftCamp, stayedAtCamp}