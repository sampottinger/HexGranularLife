/**
 * GUI Logic for running a probabilistic Conway's Game of Life simulation.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/

// Cache pre-calculated trignometric results
var SIN_60 = 0.866025;
var COS_60 = 0.5;


// Display options
var COLUMN_DISTANCE = constants.HEXAGON_DIAM - 2;
var POPULATION_COLOR = [
    "#FFFFFF",
    "#B0B0B0",
    "#A0A0A0",
    "#909090",
    "#808080",
    "#707070",
    "#606060",
    "#505050",
    "#404040",
    "#303030",
    "#000000"
];


/**
 * Draw the state of a single cell.
 *
 * @param {context} HTML5 canvas context.
 * @param {array} Array of number with two elements, the first the x center
 *      position of the cell to draw (in canvas coordinates) and the second the
 *      y center position of the cell.
 * @param {number} The size of the population at the cell to be drawn.
**/
function drawCell(context, coordinates, population)
{
    var centerX = coordinates[0];
    var centerY = coordinates[1];
    var radius = constants.HEXAGON_RADIUS;

    context.beginPath();

    context.moveTo(centerX + radius, centerY);
    context.lineTo(centerX + radius * COS_60, centerY + radius * SIN_60);
    context.lineTo(centerX - radius * COS_60, centerY + radius * SIN_60);
    context.lineTo(centerX - radius, centerY);
    context.lineTo(centerX - radius * COS_60, centerY - radius * SIN_60);
    context.lineTo(centerX + radius * COS_60, centerY - radius * SIN_60);
    context.closePath();

    context.strokeStyle = "#C0C0C0";
    context.stroke();
    context.fillStyle = POPULATION_COLOR[population * 10];
    context.fill();
}


/**
 * Convert x and y "grid" model coordinates to HTML canvas coordinates.
 *
 * @param {number} gridX The x portion of the coordinate to convert.
 * @param {number} gridY The y portion of the coordinate to convert.
 * @return {array} Return a two element array of numbers. The first element
 *      is the converted x coordinate and the second is the converted y
 *      coordinate.
**/
function gridToCanvasCoord(gridX, gridY)
{
    var canvasX;
    var canvasY;

    canvasX = constants.HEXAGON_RADIUS + COLUMN_DISTANCE * gridX;

    if(gridX % 2 == 0)
        canvasY = constants.HEXAGON_DIAM * (gridY + 1);
    else
        canvasY = constants.HEXAGON_RADIUS + constants.HEXAGON_DIAM * gridY;

    return [canvasX, canvasY];
}


/**
 * Draw the state of the game board on the target HTML5 canvas.
 *
 * @param {grid.HexagonalGrid} The grid to draw.
**/
function drawGame(grid)
{
    var canvasCoordinates;

    var gameCanvas = $("#game-canvas")[0];
    var contex = gameCanvas.getContext("2d");

    var maxX = grid.getXSize();
    var maxY = grid.getYSize();

    for(var curY=0; curY<maxY; curY++)
    {
        for(var curX=0; curX<maxX; curX++)
        {
            canvasCoordinates = gridToCanvasCoord(curX, curY);
            drawCell(contex, canvasCoordinates, grid.getSpaceVal(curX, curY));
        }
    }
}


// Export for Node / unit testing
if (typeof window === 'undefined')
{
    var constants = require("./constants");
}
