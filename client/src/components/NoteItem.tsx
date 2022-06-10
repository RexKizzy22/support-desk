import { useAppSelector } from "../hooks/useStore";
import { Note } from "../state/slices/noteSlice";

const NoteItem = ({ note }: { note: Note }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}{" "}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
          {new Date(note.createdAt as string).toLocaleString("en-UK")}
      </div>
    </div>
  );
};

export default NoteItem;
