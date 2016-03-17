Clash of Lords

Overview
Clash of Lords is a turn-based game simulating a clash of civilizations.
There can be n players, called Lords.
Every Lord starts with 1 castle on a region.
The region is a m x m matrix, where every cell (plot) represents a different type of terrain.
Available terrains are plain, water, forest, mountain.
Castles could be built only on a plain.
Every Lord is given a certain amount of Action Points (AP) on every turn to expand its domains.
A domain is a set of adjacent plots containing at least one castle.
Every Lord has x action points per turn, but they grow through farming during the game.
Action points are spent to run actions.
Available actions are colonize, conquer, build, and fortify.
Actions can be run only on the plots (or adiacent ones) of a Lord's domain.
Action points are given at the beginning of a turn.

Terrains
Water: NTH
Plain: standard terrain. Castles can be built only there. Easy to reach but low in resources (only food).
Forest: Not to easy to reach but gives a certain amount of resources (wood, food).
Mountain: Hard to reach, easy to defend, rich in resources (wood, iron).
Castles: Hard to conquer but high in resources (stockings, people).
If a Lord loses the last castle on a domain of his, no actions will be run on that domain and it will be at the mercy of everyone.
It still farms for its lord.

Actions

Farming
Farming is a passive action.
It is run at the beginning of the turn.
Farming consists of x AP (starting ones) + #(plains) * FP + #(forests) * FF + #(mountains) * FM and #(castles) * FC.
FP, FF, FM and FC are the coefficients for plains, forests, mountains, and castles.
The total AP are rounded by floor.
Example: Player Bonnie has 14 plains, 8 forests, 5 mountains and 1 castle. Total AP:
5 + 0.1 * 14 + 0.2 * 8 + 5 * 0.3 + 1 * 0.8 = 5 + 1.4 + 1.6 + 1.5 + 0.8 = 10.3 rounded to 10.

Colonize
Colonize is an active action.
Colonization can be run from a domain on an adjacent empty plot.
Colonization has a different cost, based on the terrain of the plot (CP, CF, CM).
A colonized plot joins the Lord's domain.

Conquer
Conquer is an active action.
Conquer can be run from a domain on an adjacent enemy plot.
Cost of conquer in a normal environment for colonizable plots is the colonization cost doubled.
Castles can be conquered, too. The cost of a castle conquer is COC.

Fortify
Fortify is an active action.
Fortify can be run on every colonizable, not fortified plot of a Lord's domain (so excluding castles).
It doubles the coefficient of conquer for every enemy on that plot.
Its cost is equal to the cost of colonization for that plot.
A Lord cannot fortify an already fortified plot.

Build
Build is an active action.
Build can be run on every plain-like plot of a Lord's domain.
It builds a castle on that plot.
The plot is no more colonizable and farms as a castle from the following turn.
The cost of build is BL(C).

Rally (NTH)
Rally is a perilous action.
Rally can be run at the beginning of the turn, right after the farming.
Rally means that a Lord farms more for that turn, thus ignoring the seeding for the next one.
Rally doubles the AP for that turn, but also zeroes the AP for the following Lord's turn.

n - #Lords
m - map dimension
x - starting APs

FM(M) - coefficient(farming, plains) [= CL(M)/10 = 0.1]
FM(F) - coefficient(farming, forests) [= CL(F)/10 = 0.2]
FM(M) - coefficient(farming, mountains) [= CL(M)/10 = 0.3]
FM(C) - coefficient(farming, castles) [= BL(C)/10 = 0.8]

CL(M) - coefficient(colonization, plains) [=1]
CL(F) - coefficient(colonization, forests) [=2]
CL(M) - coefficient(colonization, mountains) [=3]
BL(C) - coefficient(build, castle) [=8]

CN(M) - coefficient(conquer, plains) [= CL(M) * 2 = 2]
CN(F) - coefficient(conquer, forests) [= CL(F) * 2 = 4]
CN(M) - coefficient(conquer, mountains) [= CL(M) * 2 = 6]
CN(C) - coefficient(conquer, castle) [=1 BL(C) * 2 = 6]

FT(M) - coefficient(fortification, plains) [= CL(M) = 1]
FT(F) - coefficient(fortification, forests) [= CL(F) = 2]
FT(M) - coefficient(fortification, mountains) [= CL(M) = 3]
