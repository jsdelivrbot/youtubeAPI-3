import _ from "lodash";
import  React  from 'react';
import ReactDOM  from "react-dom";
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY="AIzaSyDUcVaFzl-ZwpKc9xpdzVc1C0c6SXn6BrM";
import BodyBackgroundColor from "react-body-backgroundcolor";



class App extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('ReactJS');
    }

      
      videoSearch(term){
        YTSearch({key:API_KEY,term:term},(videos) =>{
            this.setState({
                videos:videos,
                selectedVideo: videos[0]
      });
    });
}
    render(){
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);
    return (
    <div>
        <BodyBackgroundColor backgroundColor='Yellow'>
        <h1>Youtube</h1>
      </BodyBackgroundColor>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        videos={this.state.videos} />
        </div>);
    }
}
ReactDOM.render(<App />,document.querySelector('.container'));