import React from 'react'
import $ from 'jquery'

class AnimationGuide extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('isFirstEnter') === 'true') {
      $('#animation-guide').hide()
      return
    }
    $(() => {
      $('#guide-1').fadeIn('slow')

      $('#animation-guide').on('click', () => {
        $('#guide-1').fadeOut('300')
        $('#guide-2').fadeIn('slow', () => {
          $('#animation-guide').unbind('click')

          $('#animation-guide').on('click', () => {
            $('#guide-2').fadeOut('300')
            $('#guide-3').fadeIn('slow', () => {
              $('#animation-guide').unbind('click')
              $('#animation-guide').click(() => $('#animation-guide').hide(300))
            })
          })
        })
      })

      localStorage.setItem('isFirstEnter', 'true')
    })
  }

  render() {
    return(
      <section className="animation-guide" id="animation-guide">
        <img
          src="http://oawjlomvj.bkt.clouddn.com/cat-1.png"
          id="guide-1"
        />
        <img
          src="http://oawjlomvj.bkt.clouddn.com/cat-2.png"
          id="guide-2"

        />
        <img
          src="http://oawjlomvj.bkt.clouddn.com/cat-3.png"
          id="guide-3"
        />
      </section>
    )
  }
}

export default AnimationGuide
