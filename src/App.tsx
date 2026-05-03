const App = () => {
    return (
        <div className="App">
            <div>
                <h3>What to buy</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>Food</span></li>
                    <li><input type="checkbox" checked={true}/> <span>Books</span></li>
                    <li><input type="checkbox" checked={false}/> <span>Games</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
