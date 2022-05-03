import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

interface Props {
    term: string;
    setTerm: (t: string) => void;
}

export default function SearchBar({ term, setTerm }: Props) {
    return (
        <TextField fullWidth id='search-field'
            label='Search products' margin='normal' type='search'
            value={term} onChange={e => {
                e.preventDefault();
                setTerm(e.target.value.toLowerCase());
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <Search></Search>
                    </InputAdornment>
                )
            }} />
    );
}