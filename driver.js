/**
 * Driver that orchestrates the running of the game of life simulation. 
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

// Create a randomized game grid.
var grid = new HexagonalGrid(60, 40);
grid.randomizeGrid();


// Register the update game callaback
$(window).load(
    function()
    {
        drawGame(grid);
        window.setInterval(updateGame, 150);
    }
);


/**
 * Updates and draws the game grid for a single time step.
**/
function updateGame()
{
    takeStep(grid);
    drawGame(grid);
}
