import React from "react";
import "./App.css";
import ChoseIconWidget from "./ChoseIconWidget";

function App() {
  return (
    <div className="App">
      <a href="https://github.com/SergeyGuns/chose-material-ui-icons">
        <img
          style={{ position: "absolute", top: 0, right: 0 }}
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          class="attachment-full size-full"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>
      <a target="_blank" href="https://material-ui.com/api/icon/">
        https://material-ui.com/api/icon/
      </a>
      <br />
      <a target="_blank" href="https://material-ui.com/components/icons/">
        https://material-ui.com/components/icons/
      </a>
      <ChoseIconWidget />
    </div>
  );
}

export default App;
