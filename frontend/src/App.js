import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: 0,
      gridSizeArr: "",
      piecesArr: "",
      toChange: "",
      triggerGrid: false,
      piece1: "red",
      piece2: "black",
      shape: "circle"
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.pieceSetter = this.pieceSetter.bind(this);
    this.colorChanger = this.colorChanger.bind(this);
    this.shapeChanger = this.shapeChanger.bind(this);
  }
  /// hanlders
  onChangehandler(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value });
      e.preventDefault();
    };
  }

  async clickHandler() {
    if (this.state.toChange > 20 || this.state.toChange < 5) {
      return window.alert("Number must be 5 minimum and 20 maximum");
    }
    let arr = await [...Array(parseInt(this.state.toChange)).keys()];
    let allPiecesArr = await this.getAllPiecesArr(arr, this.state.tocHange);
    let topPiecesArr = await this.getTopPiecesArr(arr, this.state.toChange);
    let bottomPiecesArr = await this.getBottomPieceArr(
      arr,
      this.state.toChange
    );
    this.setState({
      gridSizeArr: arr,
      gridSize: this.state.toChange,
      allPiecesArr,
      topPiecesArr,
      bottomPiecesArr
    });
  }
  /// for setting pieces
  getAllPiecesArr(arr, size) {
    let newArr = [];
    let first = 0;
    let second = 1;
    let botFirst = size - 1;
    let botSecond = size - 2;
    arr.forEach(ele => {
      newArr.push(`${first}-${ele}`);
      newArr.push(`${second}-${ele}`);
      newArr.push(`${botFirst}-${ele}`);
      newArr.push(`${botSecond}-${ele}`);
    });
    return newArr;
  }
  getTopPiecesArr(arr, size) {
    let newArr = [];
    let first = 0;
    let second = 1;
    arr.forEach(ele => {
      newArr.push(`${first}-${ele}`);
      newArr.push(`${second}-${ele}`);
    });
    return newArr;
  }
  getBottomPieceArr(arr, size) {
    let newArr = [];

    let botFirst = size - 1;
    let botSecond = size - 2;
    arr.forEach(ele => {
      newArr.push(`${botFirst}-${ele}`);
      newArr.push(`${botSecond}-${ele}`);
    });
    return newArr;
  }

  pieceSetter(coordinate, topPiecesArr, bottomPiecesArr) {
    if (topPiecesArr.includes(coordinate)) {
      let style = {
        backgroundColor: this.state.piece1,
        width: "50%",
        height: "50%",
        margin: "auto",
        borderRadius: this.state.shape === "circle" ? "14px" : "0px"
      };
      return style;
    } else if (bottomPiecesArr.includes(coordinate)) {
      let style = {
        backgroundColor: this.state.piece2,
        width: "50%",
        height: "50%",
        margin: "auto",
        borderRadius: this.state.shape === "circle" ? "14px" : "0px",
        border: "1px solid white"
      };
      return style;
    }
  }
  // rednering grid
  renderGrid(gridSize, gridSizeArr, topPiecesArr, bottomPieceArr) {
    let starterBlack = true;
    // let gridSizeArr = [...Array(gridSize).keys()];
    let gridTemplateColumns = this.sizeColumns(gridSize);
    let gridStyle = {
      display: "grid",
      gridTemplateColumns
    };
    return typeof gridSizeArr === "object" ? (
      <div className="grid-container" style={gridStyle}>
        {gridSizeArr.map((ele, idx1) => {
          starterBlack = !starterBlack;
          return gridSizeArr.map((ele2, idx2) => {
            let initialColor = starterBlack ? "black" : "white";
            let otherColor = starterBlack ? "white" : "black";
            let coordinate = `${idx1}-${idx2}`;
            return ele2 % 2 === 0 ? (
              <div className={`${initialColor} box${idx1}-${idx2}`}>
                <div
                  style={this.pieceSetter(
                    coordinate,
                    topPiecesArr,
                    bottomPieceArr
                  )}
                  className={`${coordinate}`}
                ></div>
              </div>
            ) : (
              <div className={`${otherColor} box${idx1}-${idx2}`}>
                <div
                  style={this.pieceSetter(
                    coordinate,
                    topPiecesArr,
                    bottomPieceArr
                  )}
                  className={`${coordinate}`}
                ></div>
              </div>
            );
          });
        })}{" "}
      </div>
    ) : (
      <div />
    );
  }

  sizeColumns(gridSize) {
    let string = "";
    let percentageString = Math.floor(100 / gridSize);

    for (let i = 0; i < gridSize; i++) {
      string = string.concat(percentageString, "% ");
    }
    return string;
  }

  colorChanger(piece1, piece2) {
    this.setState({ piece1, piece2 });
  }

  shapeChanger(shape) {
    this.setState({ shape });
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="page-container">
          <div className="inputbox">
            <input
              type="text"
              className="gridinput"
              value={this.state.toChange}
              onChange={this.onChangehandler("toChange")}
              placeholder="Enter your grid here"
            />
            <button onClick={this.clickHandler}>MakeGrid</button>
            <div className="colorbox">
              <span>Choose Color</span>
              <div>
                <input
                  type="radio"
                  checked={
                    this.state.piece1 === "red" && this.state.piece2 === "black"
                  }
                  onClick={() => this.colorChanger("red", "black")}
                />
                <span>Red/Black</span>
              </div>
              <div>
                <input
                  type="radio"
                  checked={
                    this.state.piece1 === "blue" && this.state.piece2 === "red"
                  }
                  onClick={() => this.colorChanger("blue", "red")}
                />
                <span>Blue/Red</span>
              </div>
            </div>

            <div className="shapebox">
              <span>Choose shape</span>
              <div>
                <input
                  type="radio"
                  checked={this.state.shape === "circle"}
                  onClick={() => this.shapeChanger("circle")}
                />
                <span>Circle</span>
              </div>
              <div>
                <input
                  type="radio"
                  checked={this.state.shape === "square"}
                  onClick={() => this.shapeChanger("square")}
                />
                <span>Square</span>
              </div>
            </div>

            {this.renderGrid(
              this.state.gridSize,
              this.state.gridSizeArr,
              this.state.topPiecesArr,
              this.state.bottomPiecesArr
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
