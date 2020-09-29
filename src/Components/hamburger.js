import React from 'react'

function Hamburger(props){
	const open = props.open
	const onShow = props.onShow

    const styles = {
      container: {
      	position: 'absolute',
      	top : open ? '1%' : '50%',
      	left : open ? '90%' : '1%',
        height: '32px',
        width: '32px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
        'transition' : 'all 0.5s ease',
      },
      line: {
        height: '3px',
        width: '24px',
        background: 'black',
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: open ? 0: 1,
        transform: open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },       
    }
    return(
      <div className='hamburger' style={styles.container}
      		onClick={onShow}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
}
export default Hamburger;