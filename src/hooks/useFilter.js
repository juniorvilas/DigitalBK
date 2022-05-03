import { useContext } from 'react';
import { FilterContext } from '../context/filter'



export const useFilter = () => {
    const context = useContext(FilterContext);
    const { filter, setFilter } = context;
    return { filter, setFilter }
}
