import React from 'react';

export default function Introduction({ nextStep }) {
    return (
        <div className="introduction">
            <h1>How panicked should I be?</h1>
            <p className="animated fadeIn">
                Something new and terrible is happening in the world.
            </p>
            <p className="animated fadeIn">
                Maybe it&apos;s a new supervirus. Maybe it&apos;s terrorism.
            </p>
            <p className="animated fadeIn">
                Whatever it is, it&apos;s going to kill you and everyone you love.
            </p>
            <p className="animated fadeIn">
                At least, that&apos;s what the media seems to be telling you.
            </p>
            <h2 className="animated fadeIn">KEEP CALM</h2>
            <p className="animated fadeIn">
                Let&apos;s find out exactly how dangerous this new threat really is...
            </p>
            <button className="animated fadeIn" type="button" onClick={nextStep}>Prepare for the worst and click to proceed</button>
            <p className="animated fadeIn small-print">
                This site makes some major - and I do mean <em>major</em> - simplifications. Don&apos;t @ me.
            </p>
        </div>
    );
}
