/**
 * Non-GUI Logic for running a probabilistic Conway's Game of Life simulation.
 *
 * Logic for running a probabilistic Conway's Game of Life simulation on a
 * hexagonal game board.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

function takeStep(grid)
{
    var xSize = grid.getXSize();
    var ySize = grid.getYSize();
    var numNeighbors;

    grid.startStagingGrid();

    for(var curY=0; curY < ySize; curY++)
    {
        for(var curX=0; curX < xSize; curX++)
        {
            numNeighbors = grid.getNumNeighbors(curX, curY);

            // Death - >=4 or <=1 neighbors, life - ==3 neighbors
            if(numNeighbors >= 4 || numNeighbors <= 1)
            {
                grid.setSpaceVal(curX, curY, 0);
            }
            else if (numNeighbors == 3)
            {
                grid.setSpaceVal(curX, curY, 1);
            }
        }
    }

    grid.endStagingGrid();
}

// Export for Node / unit testing
if (typeof window === 'undefined')
{
    exports.takeStep = takeStep;
}
