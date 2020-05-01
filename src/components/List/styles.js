import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 15px;
    min-height: 450px;
    height: 100%;
    flex: 0 0 320px;
    /*background: red;*/
    opacity: ${props => props.done ? 0.6 : 1};
    /*
        flex-grow: 0;
        flex-shrink: 0;
        flex-basis: 320px;
    */

    /* para toda div que possuir uma div antes dela */
    & + div {
        border-left: 1px solid rgba(0, 0, 0, 0.1)
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;

        h2 {
            font-weight: 500;
            font-size: 16px;
            padding: 0 10px;
        }
        
        button {
            height: 42px;
            width: 42px;
            border-radius: 18px;
            background: #3b5bfd;
            border: 0;
            cursor: pointer;
        }

    }

    ul {
        margin-top: 30px;
    }
`;
