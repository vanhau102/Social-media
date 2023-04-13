import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import './search.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountItem from '../AccountItem';
import { useEffect, useState } from 'react';
import { makeRequest } from '../../httpRequest';

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState(null);

    useEffect(() => {
        // if (!debounceValue.trim()) {
        //     setSearchResult([]);
        //     return
        // }
        // setLoading(true);
        const fetchApi = async () => {
            // setLoading(true);
            if (inputValue) {
                const result = await makeRequest.post(
                    '/search?value=' + inputValue
                );
                setSearchResult(result.data);
            }
            // console.log(result);
            // setLoading(false);
        };
        fetchApi();
    }, [inputValue]);

    console.log(searchResult);

    return (
        <Tippy
            interactive
            placement='bottom'
            trigger='click'
            visible={searchResult.length > 0}
            render={(attrs) => (
                <div className='search-result' tabIndex='-1' {...attrs}>
                    <PopperWrapper>
                        <h3>Account</h3>
                        {searchResult &&
                            searchResult.map((result) => (
                                <Link to={`profile/${result.id}`}>
                                    <AccountItem
                                        key={result.id}
                                        data={result}
                                    />
                                </Link>
                            ))}
                    </PopperWrapper>
                </div>
            )}
        >
            <div className='search'>
                <button>
                    <SearchOutlinedIcon />
                </button>
                <input
                    type='text'
                    placeholder='Search...'
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </Tippy>
    );
}

export default Search;
