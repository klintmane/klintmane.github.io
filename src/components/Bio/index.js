import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Twitter, Linkedin, GitHub } from "react-feather"

import "./style.css"

export const Bio = () => {
  const data = useStaticQuery(query)

  const { author, social } = data.site.siteMetadata

  return (
    <div className="components-bio">
      <div>
        Hi, I'm <strong>{author.name}</strong>.
        <br />
        {author.summary}
      </div>
      <div className="components-bio-content">
        <Image
          className="image"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author.name}
        />
        <ul className="social">
          {[
            [`//twitter.com/${social.twitter}`, Twitter],
            [`//github.com/${social.github}`, GitHub],
            [`//linkedin.com/in/${social.linkedin}`, Linkedin],
          ].map(([link, Icon]) => (
            <li>
              <a href={link} target="_blank" rel="nofollow">
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const query = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
          linkedin
          github
        }
      }
    }
  }
`
