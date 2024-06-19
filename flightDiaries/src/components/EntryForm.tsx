export const EntryForm = () => {
  const handleCreateEntry = () => {
    console.log("create entry");
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleCreateEntry}>
        <div>
          Date:
          <input
            data-testid="date"
            type="text"
            placeholder="date"
            // value={title}
            name="Date"
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Visibility::
          <input
            data-testid="visibility"
            type="text"
            placeholder="visibility"
            // value={title}
            name="Visibility"
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Weather:
          <input
            data-testid="weather"
            type="text"
            placeholder="weather"
            // value={title}
            name="Weather"
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Comment:
          <input
            data-testid="comment"
            type="text"
            placeholder="comment"
            // value={title}
            name="Comment"
            // onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <button data-testid="createbutton" type="submit">
          add
        </button>
      </form>
    </>
  );
};
