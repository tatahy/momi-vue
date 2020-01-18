-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-11-28 10:20:10
-- 服务器版本： 5.7.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `momi`
--
DROP DATABASE IF EXISTS `momi`;
CREATE DATABASE IF NOT EXISTS `momi` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `momi`;

-- --------------------------------------------------------

--
-- 表的结构 `mentor_info`
--

DROP TABLE IF EXISTS `mentor_info`;
CREATE TABLE `mentor_info` (
  `id` int(8) NOT NULL,
  `name` char(10) NOT NULL COMMENT '姓名',
  `picture` char(50) DEFAULT '*' COMMENT '个人相片保存路径',
  `type` char(20) NOT NULL DEFAULT '*' COMMENT '导师类型',
  `title` char(50) NOT NULL DEFAULT '*' COMMENT '个人头衔',
  `position` char(50) NOT NULL COMMENT '现状(现工作单位及职位)',
  `field` char(50) NOT NULL COMMENT '专业领域(专业技术分类)',
  `research` char(50) NOT NULL COMMENT '研究方向(个人擅长、关注的技术方向)',
  `profile` char(200) NOT NULL DEFAULT '*' COMMENT '简介(个人简介)',
  `experience` char(200) NOT NULL COMMENT '历史(个人经历)',
  `award` char(200) DEFAULT '*' COMMENT '获奖(个人所获奖项)',
  `patent` char(200) DEFAULT '*' COMMENT '专利(个人所获专利)',
  `thesis` char(200) DEFAULT '*' COMMENT '论文(个人发表论文)',
  `writing` char(200) DEFAULT '*' COMMENT '专著(个人出版著作)',
  `project` char(200) DEFAULT '*' COMMENT '项目(个人参与项目)',
  `trade` char(200) DEFAULT '*' COMMENT '委托交易标的(可委托平台进行交易的标的)',
  `create_time` int(11) NOT NULL COMMENT 'TP5自动时间字段',
  `update_time` int(11) NOT NULL COMMENT 'TP5自动时间字段',
  `delete_time` int(11) DEFAULT NULL COMMENT 'TP5自动时间字段，TP5软删除必须'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `mentor_info`
--

INSERT INTO `mentor_info` (`id`, `name`, `picture`, `type`, `title`, `position`, `field`, `research`, `profile`, `experience`, `award`, `patent`, `thesis`, `writing`, `project`, `trade`, `create_time`, `update_time`, `delete_time`) VALUES
(1, '马素德', '*', '_TYPE1', '工学博士，教授，硕士研究生导，兼职博士生导师。 四川省学术和技术带头人后备人选', '西华大学材料系系主任;教授，硕士研究生导，兼职博士生导师', '新型材料', '以水性聚氨酯树脂为代表的水性、光固化及反应性树脂的制备及其在涂料、粘结剂中的应用。', '研究思路开阔，理论基础扎实，并具有较为丰富的大规模生产经验。多项成果获得产业化应用。现为四川省青年科技创新团队带头人，成都市级产学研联合实验室技术带头人。近五年完成成果鉴定或评价两项，分别为“国际领先”和“国内领先”水平，为多家企业提供咨询与技术支持。', '2006年毕业于西安交通大学，2008年7月到2010年6月在清华大学从事博士后研究工作。', '曾获得省科技进步一等奖（排名第二）及三等奖（排名第一）各一项。', '中国发明专利授权18项', '发表论文30余篇', '参与编写专著两部', '承担省部级研究项目十项，横向课题多项', '*', 1530069473, 1530086922, 0),
(2, '许小忠', '*', '_TYPE1', '宁波海智材料创新研究院常务理事', '宁波耐特镁业科技有限公司总经理', '新型材料', '镁合金健康材料开发和产业化方面', '太原重型机械学院铸造工艺与设备专业本科，清华大学铸造专业硕士，高级工程师。曾任兵科院宁波分院第八研究所主任、宁波耐特镁业科技有限公司总经理。从事镁合金铸造和熔炼设备20余年，在镁合金健康材料开发和产业化方面有较深造诣。', '*', '*', '获得各项专利技术20多项', '*', '*', '*', '*',1530069470, 1530069499, 0),
(3, '徐宏', '*', '_TYPE1', '中北大学材料科学与工程学院教授，博士生导师', '中国北京北方恒利科技发展有限公司、总经理;中北大学教授博士生导师', '新型材料', '*', '2015年9月，徐宏带领的技术团队研发成功SLM金属粉末激光选区熔化增材制造设备，并开始市场销售，现在产品的市场发展良好，其中复杂铝合金零件激光选区熔化增材制造设备技术开发研究已经实现定型，正在准备批量生产和对外技术服务。', '1993.7-至今中国中北大学（其中2007年评为教授 及博士生导师）;2002.4-至今 中国北京北方恒利科技发展有限公司,总经理;2015.9-2017.3 中国安徽恒利增材制造科技有限公司,总经理。', '*', '*', '*', '*', '*', '*',1530069444, 1530069568, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mentor_info`
--
ALTER TABLE `mentor_info`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `mentor_info`
--
ALTER TABLE `mentor_info`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
