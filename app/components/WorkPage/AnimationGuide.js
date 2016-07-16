import React from 'react';
import $ from 'jquery';

class AnimationGuide extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('isFirstEnter') === 'true') {
      $('#animation-guide').hide();
      return;
    };
    $(() => {
      $('#guide-1')
        .fadeIn('slow')
        .click(() => {
          $('#guide-1').fadeOut('300');
          $('#guide-2').fadeIn('slow');
        })

      $('#guide-2').click(() => {
        $('#guide-2').fadeOut('300');
        $('#guide-3').fadeIn('slow');
      })

      $('#guide-3').click(() => $('#animation-guide').hide(300));

      localStorage.setItem('isFirstEnter', 'true');
    })
  }

  render() {
    return(
      <section className="animation-guide" id="animation-guide">
        <img
          src="http://7xte7j.com1.z0.glb.clouddn.com/guide_cat_1.png"
          id="guide-1"
        />
        <img
          src="http://7xte7j.com1.z0.glb.clouddn.com/guide_cat_2.png"
          id="guide-2"

        />
        <img
          src="http://7xte7j.com1.z0.glb.clouddn.com/guide_cat_3.png"
          id="guide-3"
        />
      </section>
    )
  }
}

export default AnimationGuide;
