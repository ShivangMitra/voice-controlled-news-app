import React, { useEffect, useState } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles';

const alanKey = '7e83f9c671046acdf8716f6defe5cb6e2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

  const classes = useStyles()

  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1)
        }
        else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        }
        else if(command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20){
            alanBtn().playText('Please try that again.')
          }
          else if(article){
            window.open(article.url, '_blank')
            alanBtn().playText('Opening...')
          }

        }
      }
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="https://aleshere.github.io/alan-ai-newsreader-react/static/media/alan-logo.d3e2c60f.jpg" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}></NewsCards>
    </div>
  );
}

export default App;
