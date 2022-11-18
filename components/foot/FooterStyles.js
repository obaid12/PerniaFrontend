import styled from 'styled-components';

export const Box = styled.div`
padding: 20px 0px;
background: #1B252D;
bottom: 0;
width: 100%;



@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	// max-width: 1000px;
	margin: 0 auto;
	padding-top:20px;
	padding-bottom:40px;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
// margin-left: -230px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(285px, 1fr));
grid-gap: 60px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
// margin-bottom: 20px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
color: #fff;
text-decoration: underline;
`;
