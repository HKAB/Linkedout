import {
  ClockCircleOutlined,




  HeartFilled, HomeOutlined, SafetyCertificateOutlined
} from '@ant-design/icons';
import {
  Avatar,







  Button, Card,




  Col, List,







  message, Row, Space,

  Tag,


  Tooltip, Typography
} from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { studentServices } from "services";
import { Config } from "../../config/consts";

const { Meta } = Card;
const { Title } = Typography;


const jobs = [
  {
    id: 1,
    title: 'Tuyển Dev tại facebook.wap.sh',
    seniority_level: 'Junior',
    employment_type: 'Full time',
    recruiment_url: 'https://www.google.com/',
    cover:
      'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    cities: ['Hà Nội'],
    skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
    published_date: '2020/11/15',
    description:
      'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
  },
  {
    id: 2,
    title: 'Tuyển Dev tại facebook.wap.sh',
    seniority_level: 'Mid level',
    employment_type: 'Part time',
    recruiment_url: 'https://www.google.com/',
    cover:
      'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    cities: ['Hà Nội'],
    skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
    published_date: '2020/11/15',
    description:
      'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
  },
  {
    id: 3,
    title: 'Tuyển Dev tại facebook.wap.sh',
    seniority_level: 'Fresher',
    employment_type: 'Remote',
    recruiment_url: 'https://www.google.com/',
    cover:
      'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    cities: ['Hà Nội'],
    skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
    published_date: '2020/11/15',
    description:
      'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
  },
];

const history_data = {
  post: 8,
  viewed: 32,
  interested: 24,
};

function FeedItSelf() {

  let history = useHistory();
  const addInterestedPost = (item) => {
    studentServices.createPostInterested(item.id)
      .then(() => {
        message.success("Thêm vào interested post!");
      })
      .catch(error => {
        message.error("Lỗi gì đó, hay bạn đã interest rồi 🤨");
      });
  }

  // {
  //     "type": "job",
  //     "id": 2,
  //     "company_name": "Facebook",
  //     "company_profile_picture": "/media/profile/company_congty123.jpg",
  //     "title": "18021335.html",
  //     "description": "AAAA",
  //     "seniority_level": "MidLevel",
  //     "employment_type": "Part-time",
  //     "recruitment_url": "AA.com",
  //     "published_date": "2020-08-10",
  //     "job_picture": "/media/job/default.jpg",
  //     "cities": [
  //         "Hai Phong"
  //     ],
  //     "skills": [
  //         "Ôi bạn ơi tại bạn chưa chơi đồ đấy"
  //     ]
  // },

  const [posts, setPosts] = React.useState([]);
  const [count, setCount] = React.useState({n_job: 10, n_post: 10});

  useEffect(() => {
    studentServices.getStudentFeedPost().then((posts) => {
      setPosts(posts);
      var n_job = 0;
      var n_post = 0;

      posts.forEach(post => {
        if (post.type == "job")
          n_job++
        else
          n_post++
      });
      console.log(n_job)
      console.log(n_post)
      setCount({n_job: n_job, n_post: 10});
    });
  }, [])

  return (
    <>
      <Card>
        <Row style={{ textAlign: 'center' }}>
          <Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
            <Title level={4}>Giới thiệu việc</Title>
            <div>{count.n_job}</div>
          </Col>

          <Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
            <Title level={4}>Tổng</Title>
            <div>{count.n_job + count.n_post}</div>
          </Col>
          <Col span={8}>
            <Title level={4}>Tìm đồng đội</Title>
            <div>{count.n_post}</div>
          </Col>
        </Row>
      </Card>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(item) => {
          if (item.type == "job")
            return (
              <>
                <Card
                  className="card-info"
                  key={item.id}
                  style={{ marginTop: 24 }}
                  cover={<img src={Config.backendUrl + item.job_picture} height={200}></img>}
                >
                  <Meta
                    avatar={
                      <Tooltip placement="bottom" title={item.company_name}><Avatar src={Config.backendUrl + item.company_profile_picture} ></Avatar></Tooltip>
                    }
                    title={
                      <>
                        <Title level={4} href={item.recruitment_url}>
                          {item.title} •<a href={"/profile/company/" + item.account_id}><i> {item.company_name}</i></a>
                        </Title>
                        <Button
                          style={{ float: "right", width: 100, marginRight: 45, bottom: 24 }}
                          type="primary"
                          onClick={() => window.open(item.recruitment_url)}
                        >
                          Apply
                        </Button>
                        <u>
                          <i>
                            {moment(item.published_date, 'YYYY-MM-DD').format(
                              'MMMM Do YYYY'
                            )}
                          </i>
                        </u>
                      </>
                    }
                    description={
                      <>
                        <Row>
                          <Col span={18}>
                            <div style={{ fontSize: 14 }}>{item.description}</div>
                          </Col>
                          <Col offset={1} span={5}>
                            <div>
                              <Space>
                                <SafetyCertificateOutlined />
                                {item.seniority_level}
                              </Space>
                            </div>
                            <div>
                              <Space>
                                <ClockCircleOutlined />
                                {item.employment_type}
                              </Space>
                            </div>
                            <Space>
                              <HomeOutlined />
                              <List
                                grid={{ gutter: 0 }}
                                dataSource={item.cities}
                                renderItem={(city) => city}
                              ></List>
                            </Space>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                          <Col span={19}>
                            <Space>
                              <List
                                dataSource={item.skills}
                                renderItem={(skill) => <Tag>{skill}</Tag>}
                              ></List>
                            </Space>
                          </Col>
                        </Row>
                      </>
                    }
                  ></Meta>
                </Card>
              </>
            )
          else
            return (
              <>
                <Card
                  className="card-info"
                  key={item.id}
                  style={{ marginTop: 24 }}
                  cover={<img src={ Config.backendUrl + item.post_picture} height={200}></img>}
                >
                  <Meta
                    avatar={
                      <Tooltip placement="bottom" title={item.student_firstname + " " + item.student_lastname}><Avatar src={Config.backendUrl + item.student_profile_picture}></Avatar></Tooltip>
                    }
                    title={
                      <>
                        <Title level={4}>
                          {item.title}
                        </Title>
                        <u>
                          <i>
                            {moment(item.published_date, 'YYYY-MM-DD').format(
                              'MMMM Do YYYY'
                            )}
                          </i>
                        </u>
                      </>
                    }
                    description={
                      <>
                        <Row>
                          <Col span={19}>
                            <div style={{ fontSize: 14 }}>{item.content}</div>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                          <Col span={19}>
                            <Space>
                              <List
                                dataSource={item.skills}
                                renderItem={(skill) => <Tag>{skill}</Tag>}
                              ></List>
                            </Space>
                          </Col>
                          <Col span={5}>
                            <Button
                              style={{ float: 'right' }}
                              type="primary"
                              shape="circle"
                              onClick={() => addInterestedPost(item)}
                            >
                              <HeartFilled />
                            </Button>
                          </Col>
                        </Row>
                      </>
                    }
                  ></Meta>
                </Card>
              </>
            )
        }
        }
      />
    </>
  );
}

export { FeedItSelf };

