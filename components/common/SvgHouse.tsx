import React from 'react'

const SvgHome: React.SFC<{ active: boolean }> = props => (
    <svg viewBox="0 0 486.988 486.988" width="24px" height="24px" className="house">
        <path
            d="M16.822 284.968h39.667v158.667c0 9.35 7.65 17 17 17h116.167c9.35 0 17-7.65 17-17V327.468h70.833v116.167c0 9.35 7.65 17 17 17h110.5c9.35 0 17-7.65 17-17V284.968h48.167c6.8 0 13.033-4.25 15.583-10.483 2.55-6.233 1.133-13.6-3.683-18.417L260.489 31.385c-6.517-6.517-17.283-6.8-23.8-.283L5.206 255.785c-5.1 4.817-6.517 12.183-3.967 18.7 2.55 6.516 8.783 10.483 15.583 10.483zm231.2-217.6l181.333 183.6h-24.367c-9.35 0-17 7.65-17 17v158.667h-76.5V310.468c0-9.35-7.65-17-17-17H189.656c-9.35 0-17 7.65-17 17v116.167H90.489V267.968c0-9.35-7.65-17-17-17H58.756l189.266-183.6z"
            fill={props.active ? "#4A90E7" : "#adadad"}
        />
    </svg>
)

export default SvgHome