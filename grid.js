/**
 * Logic to handle a hexagonal game grid for a Conway's Game of Life variant.
 *
 * @author Sam Pottinger
 * @license GNU GPL v3
**/


/**
 * Generate a random integer in range from a inclusive to b exclusive
 *
 * @param {number} a The min integer to generate
 * @param {number} b The max integer to generate + 1
 * @return Random integer in range [a, b)
**/
function randInt(a, b)
{
    return Math.floor(Math.random()*b) + a;
}


/**
 * High level grid management facade.
 *
 * @param {number} xSize The width of the grid to make in spaces.
 * @param {number} ySize The height of the gird to make in spaces.
**/
function HexagonalGrid(xSize, ySize)
{
    // Create game grid
    var numSpaces = xSize * ySize;
    var innerGrid = new Array(numSpaces);
    var stagingGrid = innerGrid.slice(0);

    this.getXSize = function()
    {
        return xSize;
    }

    this.getYSize = function()
    {
        return ySize;
    }

    /**
     * Get the value of a space in this grid's staging grid.
     *
     * @param {number} targetX The x position to get the value for.
     * @param {number} targetY The y position to get the value for.
     * @return {number} The value at the specified space.
    **/
    this.getSpaceVal = function(targetX, targetY)
    {
        return innerGrid[xSize * targetY + targetX];
    }

    /**
     * Set the value of a spce in this grid's staging grid.
     *
     * @param {number} targetX The x position to set the value for.
     * @param {number} targetY The y position to set the value for.
     * @param {number} val The value to assign to this space.
    **/
    this.setSpaceVal = function(targetX, targetY, val)
    {
        stagingGrid[xSize * targetY + targetX] = val;
    }

    this.changeSpaceVal = function(targetX, targetY, delta)
    {
        var curVal = stagingGrid[xSize * targetY + targetX];
        
        curVal += delta;
        if(curVal > constants.MAX_POP || curVal < constants.MIN_POP)
            return;

        stagingGrid[xSize * targetY + targetX] = curVal;
    }

    this.startStagingGrid = function()
    {
        stagingGrid = innerGrid.slice(0);
    }

    this.endStagingGrid = function()
    {
        innerGrid = stagingGrid.slice(0);
    }

    this.isValidCoord = function(targetX, targetY)
    {
        if(targetX < 0 || targetX >= xSize)
            return false;
        if(targetY < 0 || targetY >= ySize)
            return false;
        return true;
    }

    this.clearGrid = function()
    {
        for(var y=0; y<ySize; y++)
        {
            for(var x=0; x<xSize; x++)
                this.setSpaceVal(x, y, 0);
        }
        this.endStagingGrid();
    }

    this.randomizeGrid = function()
    {
        for(var i=0; i<numSpaces; i++)
            innerGrid[i] = randInt(0, 2);
    }

    /**
     * Determine how many living neighbors there are to a given cell.
     *
     * @param {number} targetX The x position of the cell to find living
     *      neighbors for.
     * @param {number} targetY The y position of the cell to find living
     *      neighbors for.
     * @return {number} Number of living neighbors to the given cell.
    **/
    this.getNumNeighbors = function(targetX, targetY)
    {
        var count = 0;
        var startY = -1;
        var endY = -1;
        var startX = targetX - 1;
        var endX = targetX + 1;

        // Determine adjacent spaces based on hexagonal grid
        if(targetX % 2 == 0)
        {
            startY = targetY;
            endY = targetY + 1;
            
            if(this.isValidCoord(targetX, targetY-1))
                count += this.getSpaceVal(targetX, targetY-1);
        }
        else
        {
            startY = targetY - 1;
            endY = targetY;

            if(this.isValidCoord(targetX, targetY+1))
                count += this.getSpaceVal(targetX, targetY+1);
        }

        // Count living
        for(var curY=startY; curY<=endY; curY++)
        {
            for(var curX=startX; curX <= endX; curX++)
            {
                if(this.isValidCoord(curX, curY))
                    count += this.getSpaceVal(curX, curY);
            }
        }

        // Adjust for own value
        count -= this.getSpaceVal(targetX, targetY);

        return count;
    }
}


// Export for Node / unit testing
if (typeof window === 'undefined')
{
    exports.randInt = randInt;
    exports.HexagonalGrid = HexagonalGrid;
    var constants = require("./constants");
}
