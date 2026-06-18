import { Text, View } from 'react-native';
import { useProjectsQuery } from '../../../../packages/shared/src/query/index.js';
import { Screen } from '../../src/components/Screen';

export default function ProjectsScreen() {
  const { data: projects = [], isLoading } = useProjectsQuery();

  return (
    <Screen title="Projects" subtitle="Track active work, applications, and matches.">
      {isLoading ? <Text className="text-text-secondary">Loading projects...</Text> : null}
      {projects.map((project) => (
        <View key={project.id} className="gap-3 rounded-[24px] border border-slate-200 bg-white p-5">
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1">
              <Text className="text-lg font-extrabold text-text-primary">{project.title}</Text>
              <Text className="text-sm text-text-secondary">{project.company}</Text>
            </View>
            <Text className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-primary">
              {project.status}
            </Text>
          </View>
          <Text className="text-sm font-semibold text-text-primary">
            {project.budget} · {project.duration}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Text key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-text-secondary">
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </Screen>
  );
}
