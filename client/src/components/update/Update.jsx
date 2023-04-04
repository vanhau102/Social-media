import './update.scss';

function Update({ setOpenUpdate }) {
    return (
        <div className='update'>
            <h3>Update</h3>
            <form>
                <input type='file' name='' id='' />
                <input type='file' name='' id='' />
                <input type='text' name='' id='' />
                <input type='text' name='' id='' />
                <input type='text' name='' id='' />
            </form>
            <button onClick={() => setOpenUpdate(false)}>Close</button>
        </div>
    );
}

export default Update;
