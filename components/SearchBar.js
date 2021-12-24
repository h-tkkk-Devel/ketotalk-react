import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query)
  };

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      onIconPress={() => onSearch(searchQuery)}
      onKeyPress={ (event) => {
                if(event.nativeEvent.key == "Enter"){
                    onSearch(searchQuery);
                }}}
      style={{height:40}}
      value={searchQuery}
    />
  );
};

export default SearchBar;